
now="$(date +'%Y-%m-%d %H:%M:%S')"
message="update $now";
git add . ;
git commit -m "$message";
git push;

ssh root@170.64.198.10 "
    cd /opt/luanlt/back-end/; 
    rm -rf stg.api.plantharvest.fun;
    git clone -b stg --single-branch https://gitlab.com/moverse/game-farm-be.git stg.api.plantharvest.fun; 
    cd stg.api.plantharvest.fun/;
    pnpm i; 
    pnpm start:stg; 
    exit;
"