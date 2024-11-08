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

# 각 파일에 대해 하위 폴더 생성 및 심볼릭 링크 생성
for i in {0..4}; do
    subfolder="file$i"
    mkdir "$subfolder"                  # 하위 폴더 생성
    ln -s "../file$i.txt" "$subfolder/"  # 파일에 대한 심볼릭 링크 생성
done
echo "각 파일에 대해 하위 폴더를 만들고 링크를 생성했습니다."
