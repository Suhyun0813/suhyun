#!/bin/bash

# 사용자로부터 입력 받기
read input

# 입력 받은 값을 공백을 기준으로 분리 (첫 번째 숫자, 연산자, 두 번째 숫자)
num1=$(echo $input | cut -d ' ' -f 1)
operator=$(echo $input | cut -d ' ' -f 2)
num2=$(echo $input | cut -d ' ' -f 3)

# 연산자에 따라 계산 수행
if [ "$operator" == "+" ]; then
  result=$((num1 + num2))
elif [ "$operator" == "-" ]; then
  result=$((num1 - num2))
else
  echo "잘못된 연산자입니다. + 또는 - 만 사용하세요."
  exit 1
fi

# 계산 결과 출력
echo " $num1 $operator $num2 = $result"

