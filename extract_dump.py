import pypdf
import sys
import os

sys.stdout.reconfigure(encoding='utf-8')

dir_path = r"c:\Users\HashJam\Desktop\Studies\Projects\프로필사이트화"
# We target the file labeled Master (actually Bachelor)
f = os.path.join(dir_path, "학부 성적증명서.pdf")

print(f"Processing: {f}")
try:
    reader = pypdf.PdfReader(f)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    
    with open('content_dump.txt', 'w', encoding='utf-8') as f_out:
        f_out.write(text)
    print("Dumped text to content_dump.txt")
except Exception as e:
    print(f"Error: {e}")
