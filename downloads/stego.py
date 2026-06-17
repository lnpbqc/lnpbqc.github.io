import numpy as np
from PIL import Image
import struct
import os
import sys


def file_to_bits(filepath):
    with open(filepath, 'rb') as f:
        data = f.read()

    filename = os.path.basename(filepath).encode('utf-8')
    filename_len = len(filename)
    file_size = len(data)

    header = struct.pack('>I', filename_len) + filename + struct.pack('>I', file_size) + data

    bits = []
    for byte in header:
        for i in range(7, -1, -1):
            bits.append((byte >> i) & 1)
    return bits


def bits_to_file(bits, output_dir='.'):
    bytes_list = []
    for i in range(0, len(bits), 8):
        byte = 0
        for j in range(8):
            if i + j < len(bits):
                byte = (byte << 1) | bits[i + j]
        bytes_list.append(byte)

    data = bytes(bytes_list)

    filename_len = struct.unpack('>I', data[:4])[0]
    filename = data[4:4+filename_len].decode('utf-8')
    file_size = struct.unpack('>I', data[4+filename_len:8+filename_len])[0]
    file_content = data[8+filename_len:8+filename_len+file_size]

    output_path = os.path.join(output_dir, filename)
    with open(output_path, 'wb') as f:
        f.write(file_content)

    return output_path, file_size


def hide_data(cover_image_path, secret_file_path, output_image_path):
    img = Image.open(cover_image_path)
    if img.mode != 'RGB':
        img = img.convert('RGB')

    pixels = np.array(img)
    height, width, channels = pixels.shape
    capacity = height * width * channels

    bits = file_to_bits(secret_file_path)
    total_bits_needed = len(bits)

    if total_bits_needed > capacity:
        raise ValueError(f"载体图片容量不足！需要 {total_bits_needed} 位，但只有 {capacity} 位可用。\n"
                        f"建议使用更大的图片或降低隐藏数据量。")

    print(f"[*] 载体图片: {cover_image_path} ({width}x{height})")
    print(f"[*] 隐藏文件: {secret_file_path}")
    print(f"[*] 数据大小: {total_bits_needed//8} 字节 ({total_bits_needed} 位)")
    print(f"[*] 图片容量: {capacity//8} 字节 ({capacity} 位)")
    print(f"[*] 使用率: {total_bits_needed/capacity*100:.2f}%")

    flat_pixels = pixels.flatten()
    for i, bit in enumerate(bits):
        flat_pixels[i] = (flat_pixels[i] & 0xFE) | bit

    stego_pixels = flat_pixels.reshape(height, width, channels)
    stego_img = Image.fromarray(stego_pixels.astype(np.uint8))

    ext = os.path.splitext(output_image_path)[1].lower()
    if ext not in ['.png', '.bmp']:
        output_image_path = os.path.splitext(output_image_path)[0] + '.png'
        print(f"[!] 警告: 已自动改为PNG格式以保留数据: {output_image_path}")

    stego_img.save(output_image_path)
    print(f"[+] 隐写图片已保存: {output_image_path}")

    return output_image_path


def extract_data(stego_image_path, output_dir='.'):
    img = Image.open(stego_image_path)
    if img.mode != 'RGB':
        img = img.convert('RGB')

    pixels = np.array(img)
    height, width, channels = pixels.shape

    print(f"[*] 分析图片: {stego_image_path} ({width}x{height})")


    flat_pixels = pixels.flatten()
    bits = [pixel & 1 for pixel in flat_pixels]


    temp_bytes = []
    for i in range(0, 32, 8):
        byte = 0
        for j in range(8):
            byte = (byte << 1) | bits[i + j]
        temp_bytes.append(byte)

    filename_len = struct.unpack('>I', bytes(temp_bytes))[0]

    if filename_len > 255 or filename_len == 0:
        print("[-] 未检测到有效的隐藏数据")
        return None

    header_bits = 32 + filename_len * 8 + 32
    header_bytes = []
    for i in range(0, header_bits, 8):
        byte = 0
        for j in range(8):
            byte = (byte << 1) | bits[i + j]
        header_bytes.append(byte)

    header_data = bytes(header_bytes)
    filename = header_data[4:4+filename_len].decode('utf-8')
    file_size = struct.unpack('>I', header_data[4+filename_len:8+filename_len])[0]

    total_bits = (4 + filename_len + 4 + file_size) * 8

    print(f"[+] 检测到隐藏文件:")
    print(f"    文件名: {filename}")
    print(f"    大小: {file_size} 字节")

    output_path, _ = bits_to_file(bits[:total_bits], output_dir)
    print(f"[+] 文件已提取: {output_path}")

    return output_path


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        print("\n示例:")
        print("  python stego.py hide cover.png secret.txt stego.png")
        print("  python stego.py extract stego.png ./output")
        sys.exit(1)

    command = sys.argv[1].lower()

    if command == 'hide':
        if len(sys.argv) != 5:
            print("用法: python stego.py hide <载体图片> <要隐藏的文件> <输出图片>")
            sys.exit(1)
        hide_data(sys.argv[2], sys.argv[3], sys.argv[4])

    elif command == 'extract':
        if len(sys.argv) < 3:
            print("用法: python stego.py extract <隐写图片> [输出目录]")
            sys.exit(1)
        output_dir = sys.argv[3] if len(sys.argv) > 3 else '.'
        os.makedirs(output_dir, exist_ok=True)
        extract_data(sys.argv[2], output_dir)

    else:
        print(f"未知命令: {command}")
        print("可用命令: hide, extract")
        sys.exit(1)


if __name__ == '__main__':
    main()
