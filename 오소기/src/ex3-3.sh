#!/bin/bash


read height_cm weight_kg

# 신장을 미터 단위로 변환
height_m=$(echo "scale=2; $height_cm / 100" | bc)

# BMI 계산
bmi=$(echo "scale=2; $weight_kg / ($height_m * $height_m)" | bc)

# 비만 여부 판단
if (( $(echo "$bmi < 18.5" | bc -l) )); then
    echo "BMI: $bmi - 저체중"
elif (( $(echo "$bmi >= 18.5 && $bmi < 23" | bc -l) )); then
    echo "BMI: $bmi - 정상체중"
else
    echo "BMI: $bmi - 비만"
fi
