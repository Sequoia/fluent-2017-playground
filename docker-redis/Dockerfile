FROM redis
# Expose ports.
EXPOSE 6379

# COPY redis.conf /usr/local/etc/redis/redis.conf
CMD [ "sh", "-c", "redis-server --requirepass $REDIS_PASS"]

# to run:
# $ docker run --name rtest --env REDIS_PASS=redispass123 -p 6379:6379 -d sequoia/redis:testing
# to connect & test:
# $ docker exec -it rtest /bin/bash
# root@xxx:/data# redis-cli
# 127.0.0.1:6379> ping
# PONG