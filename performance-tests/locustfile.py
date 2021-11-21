from locust import HttpUser, between, task


class WebsiteUser(HttpUser):

    wait_time = between(5, 15)

    def on_start(self):
        self.client.post("/sign-up", {
            "username": "test_user",
            "password": "fake_password"
        })

    @task
    def index(self):
        self.client.get("/")
