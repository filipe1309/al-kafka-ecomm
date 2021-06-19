# DevOnTheRun Notes

> notes taken during the course

<!-- https://gitignore.io -->

http://localhost:9021/

## Class 1

```sh
docker-compose up
```

```sh
./bin/zookeeper-server-start.sh config/zookeeper.properties
```

```sh
./bin/kafka-server-start.sh config/server.properties
```

```sh
./bin/zookeeper-server-start.sh config/zookeeper.properties
```

### Create Topic

https://medium.com/trainingcenter/apache-kafka-codifica%C3%A7%C3%A3o-na-pratica-9c6a4142a08f

```sh
docker-compose exec kafka kafka-topics --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1 --topic SHOP_NEWORDER

docker-compose exec kafka kafka-topics --list --bootstrap-server localhost:9092
```

### Create a Producer

```sh
docker-compose exec kafka kafka-console-producer --broker-list localhost:9092 --topic SHOP_NEWORDER
>order0,550
>order1,330
>order2,123
>order3,456
```

### Create a Consumer

```sh
docker-compose exec kafka kafka-console-consumer  --bootstrap-server localhost:9092 --topic SHOP_NEWORDER
docker-compose exec kafka kafka-console-consumer  --bootstrap-server localhost:9092 --topic SHOP_NEWORDER --from-beginning
```