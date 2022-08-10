# consul

## 安装

```shell
# consul
docker pull bitnami/consul:latest

mkdir -p /home/docker/consul/data
docker run -d --privileged=true --restart=always -p 8300:8300 -p 8301:8301 -p 8301:8301/udp -p 8500:8500 -p 8600:8600 -p 8600:8600/udp -v /home/docker/consul/data:/bitnami --name consul bitnami/consul:latest
```

# jaeger

## 安装

```shell
# jaeger
docker run -d --privileged=true --restart=always -e COLLECTOR_ZIPKIN_HOST_PORT=:9411 -p 5775:5775/udp -p 6831:6831/udp -p 6832:6832/udp  -p 5778:5778  -p 16686:16686 -p 14268:14268 -p 14250:14250 -p 9411:9411 --name jaeger jaegertracing/all-in-one:latest
```
