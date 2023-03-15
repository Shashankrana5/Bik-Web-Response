import { useState } from "react";

const LeftNavBar: React.FC = () => {
  const [hoverMessage, setHoverMessage] = useState(false);
  const [hoverTicket, setHoverTicket] = useState(false);
  const [hoverSearch, setHoverSearch] = useState(false);

  const enterTicket = () => {
    setHoverTicket(true);
  };
  const exitTicket = () => setHoverTicket(false);
  const enterSearch = () => setHoverSearch(true);
  const exitSearch = () => setHoverSearch(false);
  const enterMessage = () => {
    setHoverMessage(true);
  };

  const exitMessage = () => {
    setHoverMessage(false);
  };

  return (
    <div className="left-navigation-bar">
      <div className="flex flex-col ">

          <div
            className="ticket-nav"
            onMouseEnter={() => enterTicket()}
            onMouseLeave={() => exitTicket()} >
                <a className="cursor-pointer h-15">
                {hoverTicket ? (
                    <img
                    className="h-12"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAcpJREFUWEftmMFRwkAUhv+3M0JuUgKI3qECYwVoBUIHRgowFoBpASsQKhAr0LsolIC3iDP7nERg4iaRTUgAGXLK4b233/5/dt9uCFv20Jbx4P8CjRyjLJkfANQSqjoWJC8q1teLTl6sQq+OYQrI03kRYjIZMHWKhmIYPQheAAlwPw4wEuj9rtBl0GWqwXWTiLtVa9pSw0NAQ6dwTkyeNbk/gmRdVSoE9NYxbBDfeDQMPBHTwH8nNglYWJiENrYO02217drBWn8CIZAQBE0C48fG1dkpIH/VyXSrTAoMTizXt/6X0qsolNimmIQ90DIlN6aQ12oqljtWATcCNNvpG4LkmbrxrR1IaTsTQVQPKpULUJwdag8k8P3R9bQZtC1zoJFzUJMsHkHcCzZHHZjM96HZmegZQMmf9axj68JkDuQVjDiaeCupvDg3RdiUq2UxUD+CLYHJRaH5bJPYlLtCKpSOMvOczFeZuvMOO0bzuO12l7WMtQHpguyBdJXK/RvSBdkly4pXIDhJZ54mnpla6goNXYNGDkqSi147OEwzSIKcD0Gf5YqFSTAn8irtdXRmYTPQSDCAdigBfSJpR93v/+/vGO3prxi4dQp9AzkX9zTmC7QwAAAAAElFTkSuQmCC"
                    />
                ) : (
                    <img
                    className="h-12"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAbdJREFUWEftmHFOwjAUxr+HmBhHIkfgCHAC8QTo34qyG3gD5wk8Auj0b+EE4gn0CBwBE5aYiDxTGNnoWrdBK2BosmRJ29dfv2/ta0fYsEIbxoPtBeL2QQXFvWcA1VyqEgYgnNF58J6ln1Yh9kt1YHIcBaE6APEsUagLTCKgAvV0gEog9p0OgKslRs7ehdChi8CVOySA2D88BUhYY78UUJOVUgCVPIBvQppXgPqzdxZ2xSzMxauJQ7fUHHnxSClAUQf2F0Bz0QC6OP8MaIVVhj41R1PrF5VeQaGcHmmb74DSlFybQiLVkPs5kAHXAhTu9A0UcCJvfH8OJKWdIcbftbhSVoD0diRy4D01g1bcNuNA/ORUMcELCN14clQk5ASM8X0oPBO9AShPZx1m7KwwxoFmASVbxAGMUYnZolRmXm/cMiVURPMrjBWFopmmf8CqTdKKQgqoVGWsWrawjB+cFl0G4sibqVhVKBOB1GgHlKbaTiHzCj0612DcpQU2Us9w5RWavAa1y2UUv8TB6sjIoPogHxjvV8gdDuNN1FdpkdGZPDA3rEAR9UDsqe732/s7xopSiqAbp9APCHGgNOE19/YAAAAASUVORK5CYII="
                    />
                )}
                </a>
            </div>
            <div id="ticket-nav-left" className="border border-gray-800 flex">
              Tickets
            </div>

        {/* </div> */}
        <div
          className="messaging-nav"
          onMouseEnter={() => enterMessage()}
          onMouseLeave={() => exitMessage()}
        >
          <a className="cursor-pointer">
            {hoverMessage ? (
              <img
                className="h-12"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAYpJREFUWEftl91NwzAUhY8rpOYNNqCVxR5sACN0A5J0ANIBaNiAsklHgGcUNd0A3pI+xMiQRo6Vn2vh/CDFj4l9/fnce+VjhpENNjIe/F+gaDt/BnAHYGFJ1RhM7Lh32qjxSArlMA+WQMphBNvwdRKcP1KBPgFcdgIExNxPl0ZAtkAOobPIMqzAxKMak/tpIQxJIVtA5zjRkxOoUIMD/SglxOEM2AjUVzdF27loBeqzm6hAvXUTFahSxr8Udd3GE1DR4jXFOyk0KUTtPEKXHbmfFpamdJfVLaZuXjWvFajJfvQMFEOwneqF5IEGU6hO9QmorR51heovV634ft2fCMFw37ZJ/r/UTbSUaU6utEgByh2fNP1XRBhAOxAJSE7KN1sBuNaBshn2MyFeDJ9Cx6puIgOpEzXvK9OpK/KeMebeeMmerFTLxEaTr5txJdYXBAK+TuXj0eowBmIQr4yd3KUHqZj1YQJkPT1Vp6EAuV2lxxjoI3RuL5C8dZUeYyDrBUIIOMhTuolrdEDfmrYjNE2GppkAAAAASUVORK5CYII="
              />
            ) : (
              <img
                className="h-12"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAYRJREFUWEftl+9NwzAQxd+JICG1EmxA2YQNYIBaKhOQDUgngA1alEU6AkxAukErNXyqdMhVmsYhcS7F+YMUf0zs88/v7uRnQs8G9YwH/xeIw9EbCA9gTJyoSojAvCT1Pc/GEyl0gAGenYD8CkJzUrvg+FkKtAFw3QgQIaJpfFcLyBUIL64m8LwZwC9GmlScCiNSyBXQMQ6H4yALRZ0DHZS6+ErTZANqq5s4HHElUJvdJAVqrZukQIUy/qWoyzYegE4tXly8g0KDQtLOE3TZmlScWhrjLitbLN28aF41kMV+tAwUAbTMeiF9oM4UKlN9AKqqx7xClsvVLL7E/b0C/Fi1SfLf6CZhykwnZy46ASWOT5v+GyGMLlfDzIuA9KRksxmA2zwQgBWIFzWfQuuibhIDZSfmvK9OZ16RT4B8UruVXCn7TKvJz5vxTKgtCAFNY/1eczrOAXrH/tKnp41WzPmoA+Q8PUWnkQD5TaXnHKB77L2PptJTG8h5gQgCdvKUtnH1DugH6YgTNGtuzT0AAAAASUVORK5CYII="
              />
            )}
          </a>
        </div>
        <div
          className="search-nav"
          onMouseEnter={() => {
            enterSearch();
          }}
          onMouseLeave={() => exitSearch()}
        >
          <a className="cursor-pointer">
            {hoverSearch ? (
              <img
                className="h-12"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAArBJREFUWEftl1tSGkEUhv/TVIS3uARhzLO4gsAKxBUEd8AMC4guQCAryGQFwRWErCDjc1B0B/BGa9kndci04TZ0j5aUqbJfu/v0N/+5DuGVLXplPPh/gUbd0p5hPgKjBsIegGqqbgLGDQgDRXRRDqc3z1HdqdAMBOYzmJpeDxHHCursqWAbgYbdnQYxfQWw6wXz79CYiU/2w7t+znvZMTQ8LzWJWGAeFwM/wRQX1ENSDu8T2Rh131UfTKEK4iYBHxfOM53st6dxHqi1CqXKfJ8zdGmIWh/C6WCT8d/dUk0x9wAc2HNMfJxHqRWgNHh/zbnpUpGulUOMfb501MWu4aKAW6ixIl32vb8CdN3ZiRn0KX08F4wFXoYi8LdKdOeVFAtAqToja9gQ1V1uylItdd8Pu6+Iyj6ZtwB0dV5sgdAVIxLA+5Gu+bgp68ywUxw8BjojDNpa4mvjWgC67hT7DBzNgJ6QIcsvzWcqAReVSDdyAV11ipLKs2BUZA5taruMZO1LSTCsJEFkJUGkD122Fl3WKbK9EETaWcVdxmX/KqfNbQJNgkg7K/4y0Iu5zDdJthbUAL4EkW653JyZ9gQMKpGuuwxs2n922r9gYZwo0ns+7cPVOhJFuu5jaF6ptHVIlf47xDGdBe3pqY/aWc1Vgvu9rR95oFZggFtFuur7Ub7jR2KIQldfS/uXtB473koP6gdtfeyjjpzJLH7rBjQJdAOKC/RwuTCgceFAgZsMrO99xHEQ3p34QPmMsDLxWff52JQztwQkti/OLnlCOduDZB6zOZ2bkTZBTcDUU2rak5hZmq28oJxA9vVZSTDcIEKNMfsNkiY8YSARNeRXSCkdLwdvXihvIF9frTuXB2orQALpC7U1oGWorAFwq0AWyrAaZP2vbR3IFYtvQG8KuRRw7f8BG656NPOijo0AAAAASUVORK5CYII="
              />
            ) : (
              <img
                className="h-12"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAppJREFUWEftl1Fu2kAQhv8psVTVkcoRyAlCTlA4QZLnsm24ATlBmxOUngBat88lJyg5Qc0JSm4AEltVwmSqMWvAgL3rRLFSKSv5yevx539mdn4TntiiJ8aD/xeIey9rOKicAtQAuAagbtQNARoDPES0uKb23/FDVLcqFIN4lQ9gXDi9iNDHfHF1X7BcIA5enQHUA1B1gllvmgDcJvVnUPC57Brir/4FCAKzuW7A6KOCkN7qUG7wd7+OBeqgWME3qd2MNr3T/SJQexUyyvzYCDQCqENqNswLzsGh1FcXwPF6H58XUWoHyBTvr400jRB5DWpPJi5fyr1qFQdzAU+gJoi8I9fnd4ECXyR+b15eCCYB3gP1hZR2aooUkFHn91oJatrSlKWaSd/P1f1oceTSeWmgb34HjE8myA0p3XBJUzaUL6lbFjrhklpa6it3bQEdDsB8Gj9xjw7ZflOqU4muqTU7KwYU+NLKy2J8gZOktW1BMhWSI+EO0iCyQlL6xBYrrVDgc/IAKW09xW3BY6ELxiwTaEpKW0/8baDHTJlTk5RX1MBnUrpjS3Ne2w9J6aYtQN59Dh7a9kvP8xgH4xSRV3MZH7bRESLymi6BNpUyo0NOaWPi6IrU7KOL2lnDVYr7dXJ+FIHahcEtIq/u+lGu9kNs6qVtrpn5JaMnsbcyMwakZucu6iwnTMbKMGhDiEUljFIGjXFsLO7+2UfoU0u3XaBcLKzYkSR9LjFlzy2IwtVcXH66E5R1PBhLIgWZeKQ8qClAXUQHXakZTnsrJygrUPJ28/chpr8Bjn+DZAhPZWjGF2GMudffLt6iUM5Arrnat68IVClAZupvWuPM9JUGtAOVYQBLBVpBMYZZ/2ulA9lq8RnoWSGbArb7/wCB8zg0nEbdVwAAAABJRU5ErkJggg=="
              />
            )}
          </a>
        </div>
      </div>
      <div id="chat-nav-left" className="border border-gray-800 flex hidden">
        Message
      </div>
      <div id="search-nav-left" className="border border-gray-800 flex hidden">
        Search
      </div>
    </div>
  );
};

export default LeftNavBar;