test: 
	docker-compose exec web ./vendor/bin/phpunit

test_specific:
	docker-compose exec web ./vendor/bin/phpunit --filter $(filter)
	
test_fail:
	docker-compose exec web ./vendor/bin/phpunit --group failing

seed_db:
	docker-compose exec web php artisan db:seed