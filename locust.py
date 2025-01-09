from locust import HttpUser, between, task


# HttpUser: UserAgent
class WebsiteUser(HttpUser):
    def __init__(self, parent):
        super(WebsiteUser, self).__init__(parent)
        self.token = ""

    wait_time = between(1, 3) # How long is it going to wait after visiting endpoints in seconds

    def on_start(self):
        with self.client.get("/login") as response:
            self.token = response.json()["token"]

    @task
    def secret_page(self):
        self.client.get("/secret", headers={"authorization": self.token})
    #
    # @task
    # def hello_page(self):
    #     self.client.get(url="/hello")
    #
    # @task
    # def slow_page(self):
    #     self.client.get(url="/slow")