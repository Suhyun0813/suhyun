#!/bin/bash

# 프로그램 시작 메시지
echo "프로그램을 시작합니다."

# 내부 함수 정의
list_files() {
    # 전달받은 인자를 ls 명령어에 전달하여 실행
    ls "$@"
}

# 함수 호출 및 인자 전달
list_files "$@"

# 프로그램 종료 메시지
echo "프로그램을 종료합니다."
