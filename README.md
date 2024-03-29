<a name="readme-top"></a>

<br />
<div align="center">
<h3 align="center">Bik-Web Response</h3>

  <p align="center">
Welcome to our Bik-Web Response - your all-in-one ticketing software! Seamlessly track issues, manage tasks, and support requests with this intuitive system. 

Streamline your workflow, resolve issues efficiently, and enhance team productivity!
    <br />
    <br />
    <a href="https://bik-web.com">Site Url</a>
    .
    <a href="https://bik-web.com/demo">Demo Url</a>
    .
    <a href="https://github.com/Shashankrana5/Bik-Web-Response/issues">Report Bug</a>
    ·
    <a href="https://github.com/Shashankrana5/Bik-Web-Response/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

Bik-Web Response is a comprehensive ticketing software designed to simplify task management, project tracking, and support ticket resolution. With a powerful issue tracking system at its core, Bik-Web Response enables teams to organize and prioritize tasks effortlessly. What sets Bik-Web Response apart is its integrated chat feature, facilitating real-time communication among team members. This seamless collaboration enhances problem-solving, accelerates task resolution, and fosters a more productive work environment. Experience the ease of managing tickets, projects, and communication in one centralized platform with Bik-Web Response.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![Typescript][Typescript-shield]][Typescript-docs]
* [![React.js][React.js]][React-url]
* [![Mongodb][Mongodb-shield]][Mongodb-docs]
* [![Express][Express-shield]][Express-docs]
* [![Redux][Redux-shield]][Redux-docs]
* [![Docker][Docker-shield]][Docker-docs]
* [![AWS][AWS-shield]][AWS-docs]





<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started


To get a local copy up and running follow these simple example steps:

### Prerequisites

Ensure you have the following installed
* Docker ([docs](https://docs.docker.com/engine/install/))
* Node package manager ([docs](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm))

Make sure you have a `.env` file at ./backend which has the following fields: `MONGO_URI="<URI_TO_MONGO>"`, `SERVER_PORT=1913`, `CLIENT_PORT=1912`, and `CHAT_PORT=1914`
### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/Shashankrana5/Bik-Web-Response.git
   ```

2. Enter the directory

   ```sh
   cd Bik-Web-Response
   ```

3. Build and run the docker containers

   ```sh
   docker compose up -d
   ```
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

This will start a local instance on your machine. You should be able to access it from http://localhost:1912. The backend endpoints are on port `1913` & `1914`.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Shashank Rana - shashankbrana@outlook.com

Project Link: [https://github.com/Shashankrana5/Bik-Web-Response](https://github.com/Shashankrana5/Bik-Web-Response)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Spring-Shield]:https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white
[Spring-url]: https://spring.io/
[React-native-shield]: https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[Postgres-shield]:https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[Redis-shield]: https://img.shields.io/badge/redis-%23DD0031.svg?&style=for-the-badge&logo=redis&logoColor=white
[React-native-docs]:https://reactnative.dev/docs/getting-started
[Redis-docs]:https://redis.io/docs/
[Postgres-docs]: https://www.postgresql.org/docs/
[Express-shield]:https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white
[Mongodb-shield]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[Redux-shield]: https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white
[Typescript-shield]:https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[Typescript-docs]: https://www.typescriptlang.org/download
[Redux-docs]: https://redux.js.org/introduction/getting-started
[Express-docs]: https://expressjs.com/en/starter/installing.html
[Mongodb-docs]:https://www.mongodb.com/docs/
[AWS-shield]:https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white
[AWS-docs]:https://docs.aws.amazon.com/
[Docker-shield]:https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white
[Docker-docs]:https://docs.docker.com/