#!/bin/bash

echo "리눅스가 재미있나요? (yes / no)"
read answer

case $answer in
    yes | y | Y | Yes | YES)
        echo "좋아요! 리눅스를 즐기고 계시군요.";;
    no | n | N | No | NO)
        echo "아쉽네요. 더 재미있는 점을 찾아보세요!";;
    *)
        echo "yes 또는 no로 입력해 주세요.";;
esac
