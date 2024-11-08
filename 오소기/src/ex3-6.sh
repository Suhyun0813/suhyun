#!/bin/bash

# 폴더 이름 입력 받기
read -p "폴더 이름을 입력하세요: " folder_name

# 폴더가 존재하는지 확인하고 없으면 생성
if [ ! -d "$folder_name" ]; then
    mkdir "$folder_name"
    echo "$folder_name 폴더를 생성했습니다."
else
    echo "$folder_name 폴더가 이미 존재합니다."
fi

# 지정된 폴더로 이동
cd "$folder_name"

# 5개의 텍스트 파일 생성
for i in {0..4}; do
    touch "file$i.txt"
done
echo "5개의 파일을 생성했습니다."

# 생성된 파일들을 tar로 압축
tar -cvf files.tar file*.txt
echo "파일들을 files.tar로 압축했습니다."

# 새로운 폴더 생성 후 압축 해제
mkdir extracted_files
tar -xvf files.tar -C extracted_files
echo "압축을 extracted_files 폴더에 해제했습니다."
