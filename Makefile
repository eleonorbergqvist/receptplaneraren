test: 
	docker-compose exec web ./vendor/bin/phpunit

test_specific:
	docker-compose exec web ./vendor/bin/phpunit --filter $(filter)
	
test_fail:
	docker-compose exec web ./vendor/bin/phpunit --group failing