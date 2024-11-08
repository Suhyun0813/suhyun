#!/bin/bash

# 사용법 안내
if [ "$#" -ne 2 ]; then
    echo "사용법: $0 이름 전화번호"
    exit 1
fi

# 인자 저장
name=$1
phone=$2

# 정보 추가
echo "$name $phone" >> DB.txt
echo "$name님의 정보가 DB.txt에 추가되었습니다."
