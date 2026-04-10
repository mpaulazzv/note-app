#!/bin/bash
BLUE='\033[0;34m'
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}Starting...${NC}"

echo -e "${BLUE}Building database container...${NC}"
docker compose up -d

echo -e "${GREEN}Building Backend (Spring Boot)...${NC}"
cd ./backend/noteapp || { echo -e "${RED}Directory not found${NC}"; exit 1; }

if [ -f "./mvnw" ]; then
    ./mvnw spring-boot:run &
elif [ -f "./gradlew" ]; then
    ./gradlew bootRun &
else
    mvn spring-boot:run &
fi

BACKEND_PID=$! 

echo -e "${GREEN}Building Frontend (React/Vite)...${NC}"
cd ../../frontend/note-app || { echo -e "${RED}Directory not found${NC}"; exit 1; }

npm install && npm run dev &
FRONTEND_PID=$! 

echo -e "${BLUE}---------------------------------------${NC}"
echo -e "${GREEN}Development up!${NC}"
echo -e "Backend running (PID: $BACKEND_PID)"
echo -e "Frontend running (PID: $FRONTEND_PID)"
echo -e "${BLUE}Press [CTRL+C] to stop both services.${NC}"
echo -e "${BLUE}---------------------------------------${NC}"

trap "kill $BACKEND_PID $FRONTEND_PID; echo -e '\n${RED}Servers stopped.${NC}' exit;" SIGINT

wait