#!/bin/bash

# 검색할 이름을 입력받음
if [ "$#" -ne 1 ]; then
    echo "사용법: $0 이름"
    exit 1
fi

name=$1

# DB.txt에서 이름 검색
grep -i "$name" DB.txt

# 검색 결과가 없을 경우 메시지 출력
if [ $? -ne 0 ]; then
    echo "$name에 해당하는 정보를 찾을 수 없습니다."
fi
