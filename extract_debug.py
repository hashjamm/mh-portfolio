import os
dir_path = r"c:\Users\HashJam\Desktop\Studies\Projects\프로필사이트화"
f1 = os.path.join(dir_path, "학부 성적증명서.pdf")
f2 = os.path.join(dir_path, "석사성적증명서.pdf")

s1 = os.path.getsize(f1)
s2 = os.path.getsize(f2)
try:
    with open('content_dump.txt', 'w', encoding='utf-8') as f_out:
        f_out.write(f"Size 1: {s1}, Size 2: {s2}\n")
    print("Dumped size info to content_dump.txt")
except Exception as e:
    print(f"Error writing to content_dump.txt: {e}")


if s1 == s2:
    print("Files have SAME SIZE.")
    # Check hash or bytes
    with open(f1, 'rb') as a, open(f2, 'rb') as b:
        if a.read() == b.read():
             print("Files are IDENTICAL in content.")
        else:
             print("Files are DIFFERENT content.")
else:
    print("Files are DIFFERENT size.")
