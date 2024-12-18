now="$(date +'%Y-%m-%d %H:%M:%S')"
message="update $now"
git add .
git commit -m "$message"
git push

ssh root@170.64.198.10 "
    cd /opt/luanlt/back-end/; 
    rm -rf api.wincrypto.ai;
    git clone -b prod --single-branch https://github.com/WinCrypto-AI/backend.git api.wincrypto.ai; 
    cd api.wincrypto.ai/;
    cp /opt/luanlt/back-end/envs/api.wincrypto.ai.env .env;
    yarn; 
    pnpm start:prod; 
    exit;
"
