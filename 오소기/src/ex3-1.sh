#!/bin/bash

# 사용자로부터 숫자 입력 받기
echo "몇 번 'Hello, World!'를 출력할지 숫자를 입력하세요:"
read num

# 입력한 숫자만큼 반복하여 'Hello, World!' 출력
for ((i=1; i<=num; i++))
do
  echo "Hello, World!"
done
