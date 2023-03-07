module.exports = {
    apps: [
        {
            // pm2로 실행한 프로세스 목록에서 이 애플리케이션의 이름으로 지정될 문자열
            name: "client",
            // pm2로 실행 스트립트
            script: "npm run start",
            // 개발환경시 적용될 설정 지정
            env: {
                "PORT": 30023,
                "NODE_ENV": "development"
            },
            // 배포환경시 적용될 설정 지정
            env_production: {
                "PORT": 30023,
                "NODE_ENV": "production"
            }
        },{
            name      : "server",
            script    : "npm run server",
            // 개발환경시 적용될 설정 지정
            env: {
                "PORT": 30022,
                "NODE_ENV": "development"
            },
            // 배포환경시 적용될 설정 지정
            env_production: {
                "PORT": 30022,
                "NODE_ENV": "production"
            }
        }
    ]
};