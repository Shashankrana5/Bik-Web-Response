import { useState, useEffect } from 'react';

interface LeftnavBarProps {

  minimizeLeftNavbar: boolean;
}

const LeftNavBar: React.FC = (props: LeftnavBarProps) => {
  const [hoverMessage, setHoverMessage] = useState(false);
  const [hoverTicket, setHoverTicket] = useState(false);
  const [hoverSearch, setHoverSearch] = useState(false);
  const { minimizeLeftNavbar } = props;


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

  useEffect(() => {}, [minimizeLeftNavbar])
  if (minimizeLeftNavbar == true){
  return(
    <div className="left-navigation-bar">


      <div className="user-wrapper h-14 flex items-center">
        <svg className = "h-10"viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18 18.7023C18 15.6706 14.5 15 12 15C9.5 15 6 15.6706 6 18.7023M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
      </div>
      <div className="dashboard-left-navigation-minimized">
      <svg className = "h-8" fill="#ffae3d" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg" stroke="#ffae3d"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M833.935 1063.327c28.913 170.315 64.038 348.198 83.464 384.79 27.557 51.84 92.047 71.944 144 44.387 51.84-27.558 71.717-92.273 44.16-144.113-19.426-36.593-146.937-165.46-271.624-285.064Zm-43.821-196.405c61.553 56.923 370.899 344.81 415.285 428.612 56.696 106.842 15.811 239.887-91.144 296.697-32.64 17.28-67.765 25.411-102.325 25.411-78.72 0-154.955-42.353-194.371-116.555-44.386-83.802-109.102-501.346-121.638-584.245-3.501-23.717 8.245-47.21 29.365-58.277 21.346-11.294 47.096-8.02 64.828 8.357ZM960.045 281.99c529.355 0 960 430.757 960 960 0 77.139-8.922 153.148-26.654 225.882l-10.39 43.144h-524.386v-112.942h434.258c9.487-50.71 14.231-103.115 14.231-156.084 0-467.125-380.047-847.06-847.059-847.06-467.125 0-847.059 379.935-847.059 847.06 0 52.97 4.744 105.374 14.118 156.084h487.454v112.942H36.977l-10.39-43.144C8.966 1395.137.044 1319.128.044 1241.99c0-529.243 430.645-960 960-960Zm542.547 390.686 79.85 79.85-112.716 112.715-79.85-79.85 112.716-112.715Zm-1085.184 0L530.123 785.39l-79.85 79.85L337.56 752.524l79.849-79.85Zm599.063-201.363v159.473H903.529V471.312h112.942Z" fill-rule="evenodd"></path> </g></svg>
      </div>
      <div className="ticket-left-navigation-minimized">
      <svg className = "h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffae3d"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.37 8.87988H17.62" stroke="#ffae3d" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6.38 8.87988L7.13 9.62988L9.38 7.37988" stroke="#ffae3d" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12.37 15.8799H17.62" stroke="#ffae3d" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6.38 15.8799L7.13 16.6299L9.38 14.3799" stroke="#ffae3d" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#ffae3d" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
      </div>

      <div className="chat-left-navigation-minimized">
      <svg className = "h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 10H16.01M12 10H12.01M8 10H8.01M3 10C3 4.64706 5.11765 3 12 3C18.8824 3 21 4.64706 21 10C21 15.3529 18.8824 17 12 17C11.6592 17 11.3301 16.996 11.0124 16.9876L7 21V16.4939C4.0328 15.6692 3 13.7383 3 10Z" stroke="#ffae3d" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>      
      </div>
      <div className="search-left-navigation-minimized">
      <svg className = "h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11C18 14.866 14.866 18 11 18C7.13401 18 4 14.866 4 11ZM11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C13.125 20 15.078 19.2635 16.6177 18.0319L20.2929 21.7071C20.6834 22.0976 21.3166 22.0976 21.7071 21.7071C22.0976 21.3166 22.0976 20.6834 21.7071 20.2929L18.0319 16.6177C19.2635 15.078 20 13.125 20 11C20 6.02944 15.9706 2 11 2Z" fill="#ffae3d"></path> </g></svg>
      </div>
    </div>  
  )
}

else{
return(

      <div className ="left-navigation-bar border border-gray-200 w-[25%]">


      <div className="title-wrapper px-6">
        {/* / Bik-Web Response */}
        <div className="title flex font-bold uppercase border-b border-gray-400 hover:text-gray-700 h-14 items-center"> users's picture</div>
      </div>
    <div className="flex">
    <div className="navbar-sub-navgiation-spacing w-[25%]"></div>
    <div className="navbar-sub-navigation flex flex-col">
      <div className="dashboard-left-navbar flex justify-start">
          <svg className = "h-8" fill="#ffae3d" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg" stroke="#ffae3d"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M833.935 1063.327c28.913 170.315 64.038 348.198 83.464 384.79 27.557 51.84 92.047 71.944 144 44.387 51.84-27.558 71.717-92.273 44.16-144.113-19.426-36.593-146.937-165.46-271.624-285.064Zm-43.821-196.405c61.553 56.923 370.899 344.81 415.285 428.612 56.696 106.842 15.811 239.887-91.144 296.697-32.64 17.28-67.765 25.411-102.325 25.411-78.72 0-154.955-42.353-194.371-116.555-44.386-83.802-109.102-501.346-121.638-584.245-3.501-23.717 8.245-47.21 29.365-58.277 21.346-11.294 47.096-8.02 64.828 8.357ZM960.045 281.99c529.355 0 960 430.757 960 960 0 77.139-8.922 153.148-26.654 225.882l-10.39 43.144h-524.386v-112.942h434.258c9.487-50.71 14.231-103.115 14.231-156.084 0-467.125-380.047-847.06-847.059-847.06-467.125 0-847.059 379.935-847.059 847.06 0 52.97 4.744 105.374 14.118 156.084h487.454v112.942H36.977l-10.39-43.144C8.966 1395.137.044 1319.128.044 1241.99c0-529.243 430.645-960 960-960Zm542.547 390.686 79.85 79.85-112.716 112.715-79.85-79.85 112.716-112.715Zm-1085.184 0L530.123 785.39l-79.85 79.85L337.56 752.524l79.849-79.85Zm599.063-201.363v159.473H903.529V471.312h112.942Z" fill-rule="evenodd"></path> </g></svg>
          <div className ="dashboard-nav">
            Dashboard
            </div>
      </div>
      <div className="ticket-left-navbar flex justify-start">
        
              <svg className = "h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffae3d"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.37 8.87988H17.62" stroke="#ffae3d" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6.38 8.87988L7.13 9.62988L9.38 7.37988" stroke="#ffae3d" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12.37 15.8799H17.62" stroke="#ffae3d" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6.38 15.8799L7.13 16.6299L9.38 14.3799" stroke="#ffae3d" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#ffae3d" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
              <div className ="tickets-nav">

            tickets
            </div>
      </div>
      <div className="chat-left-navbar flex justify-start">
            <svg className = "h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 10H16.01M12 10H12.01M8 10H8.01M3 10C3 4.64706 5.11765 3 12 3C18.8824 3 21 4.64706 21 10C21 15.3529 18.8824 17 12 17C11.6592 17 11.3301 16.996 11.0124 16.9876L7 21V16.4939C4.0328 15.6692 3 13.7383 3 10Z" stroke="#ffae3d" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>      
            <div className ="chats-nav">
           chats
           </div>
      </div>
      <div className="search-left-navbar flex justify-start">
      <svg className = "h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11C18 14.866 14.866 18 11 18C7.13401 18 4 14.866 4 11ZM11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C13.125 20 15.078 19.2635 16.6177 18.0319L20.2929 21.7071C20.6834 22.0976 21.3166 22.0976 21.7071 21.7071C22.0976 21.3166 22.0976 20.6834 21.7071 20.2929L18.0319 16.6177C19.2635 15.078 20 13.125 20 11C20 6.02944 15.9706 2 11 2Z" fill="#ffae3d"></path> </g></svg>
          <div className="search-nav">
            Serach
            </div>
      </div>
      </div>
    </div>
    </div>
  );
}



    // <div className="">
    //     <div>shashank</div>
    //     <div className="flex">
    //         <div className="">
    //             shashank
    //         </div>
    //         <div>
    //             ranaaskdfja;lskdjfl;aksdjflkas;jdfl;kasjdf
    //         </div>
    //     </div>
    // </div>
    // <div className="left-navigation-bar">
    //     <div className="flex">
    //     <div
    //         className="ticket-nav"
    //         onMouseEnter={() => enterTicket()}
    //         onMouseLeave={() => exitTicket()} >

    //             <a className="cursor-pointer h-15 block ">
    //             {hoverTicket ? (
    //                 <img
    //                 className="h-12 block"
    //                 src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAcpJREFUWEftmMFRwkAUhv+3M0JuUgKI3qECYwVoBUIHRgowFoBpASsQKhAr0LsolIC3iDP7nERg4iaRTUgAGXLK4b233/5/dt9uCFv20Jbx4P8CjRyjLJkfANQSqjoWJC8q1teLTl6sQq+OYQrI03kRYjIZMHWKhmIYPQheAAlwPw4wEuj9rtBl0GWqwXWTiLtVa9pSw0NAQ6dwTkyeNbk/gmRdVSoE9NYxbBDfeDQMPBHTwH8nNglYWJiENrYO02217drBWn8CIZAQBE0C48fG1dkpIH/VyXSrTAoMTizXt/6X0qsolNimmIQ90DIlN6aQ12oqljtWATcCNNvpG4LkmbrxrR1IaTsTQVQPKpULUJwdag8k8P3R9bQZtC1zoJFzUJMsHkHcCzZHHZjM96HZmegZQMmf9axj68JkDuQVjDiaeCupvDg3RdiUq2UxUD+CLYHJRaH5bJPYlLtCKpSOMvOczFeZuvMOO0bzuO12l7WMtQHpguyBdJXK/RvSBdkly4pXIDhJZ54mnpla6goNXYNGDkqSi147OEwzSIKcD0Gf5YqFSTAn8irtdXRmYTPQSDCAdigBfSJpR93v/+/vGO3prxi4dQp9AzkX9zTmC7QwAAAAAElFTkSuQmCC"
    //                 />
    //             ) : (
    //                 <img
    //                 className="h-12"
    //                 src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAbdJREFUWEftmHFOwjAUxr+HmBhHIkfgCHAC8QTo34qyG3gD5wk8Auj0b+EE4gn0CBwBE5aYiDxTGNnoWrdBK2BosmRJ29dfv2/ta0fYsEIbxoPtBeL2QQXFvWcA1VyqEgYgnNF58J6ln1Yh9kt1YHIcBaE6APEsUagLTCKgAvV0gEog9p0OgKslRs7ehdChi8CVOySA2D88BUhYY78UUJOVUgCVPIBvQppXgPqzdxZ2xSzMxauJQ7fUHHnxSClAUQf2F0Bz0QC6OP8MaIVVhj41R1PrF5VeQaGcHmmb74DSlFybQiLVkPs5kAHXAhTu9A0UcCJvfH8OJKWdIcbftbhSVoD0diRy4D01g1bcNuNA/ORUMcELCN14clQk5ASM8X0oPBO9AShPZx1m7KwwxoFmASVbxAGMUYnZolRmXm/cMiVURPMrjBWFopmmf8CqTdKKQgqoVGWsWrawjB+cFl0G4sibqVhVKBOB1GgHlKbaTiHzCj0612DcpQU2Us9w5RWavAa1y2UUv8TB6sjIoPogHxjvV8gdDuNN1FdpkdGZPDA3rEAR9UDsqe732/s7xopSiqAbp9APCHGgNOE19/YAAAAASUVORK5CYII="
    //                 />
    //             )}
    //             </a>
    //         </div>
    //         <div id="ticket-nav-left" className="border border-gray-800 ">
    //            Tickets
    //          </div>
    //     </div>
    // </div>
    // <div className="left-navigation-bar">
    //   <div className="flex flex-col ">

    //       <div
    //         className="ticket-nav"
    //         onMouseEnter={() => enterTicket()}
    //         onMouseLeave={() => exitTicket()} >
    //             <a className="cursor-pointer h-15">
    //             {hoverTicket ? (
    //                 <img
    //                 className="h-12"
    //                 src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAcpJREFUWEftmMFRwkAUhv+3M0JuUgKI3qECYwVoBUIHRgowFoBpASsQKhAr0LsolIC3iDP7nERg4iaRTUgAGXLK4b233/5/dt9uCFv20Jbx4P8CjRyjLJkfANQSqjoWJC8q1teLTl6sQq+OYQrI03kRYjIZMHWKhmIYPQheAAlwPw4wEuj9rtBl0GWqwXWTiLtVa9pSw0NAQ6dwTkyeNbk/gmRdVSoE9NYxbBDfeDQMPBHTwH8nNglYWJiENrYO02217drBWn8CIZAQBE0C48fG1dkpIH/VyXSrTAoMTizXt/6X0qsolNimmIQ90DIlN6aQ12oqljtWATcCNNvpG4LkmbrxrR1IaTsTQVQPKpULUJwdag8k8P3R9bQZtC1zoJFzUJMsHkHcCzZHHZjM96HZmegZQMmf9axj68JkDuQVjDiaeCupvDg3RdiUq2UxUD+CLYHJRaH5bJPYlLtCKpSOMvOczFeZuvMOO0bzuO12l7WMtQHpguyBdJXK/RvSBdkly4pXIDhJZ54mnpla6goNXYNGDkqSi147OEwzSIKcD0Gf5YqFSTAn8irtdXRmYTPQSDCAdigBfSJpR93v/+/vGO3prxi4dQp9AzkX9zTmC7QwAAAAAElFTkSuQmCC"
    //                 />
    //             ) : (
    //                 <img
    //                 className="h-12"
    //                 src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAbdJREFUWEftmHFOwjAUxr+HmBhHIkfgCHAC8QTo34qyG3gD5wk8Auj0b+EE4gn0CBwBE5aYiDxTGNnoWrdBK2BosmRJ29dfv2/ta0fYsEIbxoPtBeL2QQXFvWcA1VyqEgYgnNF58J6ln1Yh9kt1YHIcBaE6APEsUagLTCKgAvV0gEog9p0OgKslRs7ehdChi8CVOySA2D88BUhYY78UUJOVUgCVPIBvQppXgPqzdxZ2xSzMxauJQ7fUHHnxSClAUQf2F0Bz0QC6OP8MaIVVhj41R1PrF5VeQaGcHmmb74DSlFybQiLVkPs5kAHXAhTu9A0UcCJvfH8OJKWdIcbftbhSVoD0diRy4D01g1bcNuNA/ORUMcELCN14clQk5ASM8X0oPBO9AShPZx1m7KwwxoFmASVbxAGMUYnZolRmXm/cMiVURPMrjBWFopmmf8CqTdKKQgqoVGWsWrawjB+cFl0G4sibqVhVKBOB1GgHlKbaTiHzCj0612DcpQU2Us9w5RWavAa1y2UUv8TB6sjIoPogHxjvV8gdDuNN1FdpkdGZPDA3rEAR9UDsqe732/s7xopSiqAbp9APCHGgNOE19/YAAAAASUVORK5CYII="
    //                 />
    //             )}
    //             </a>
    //         </div>
    //      

    //     <div
    //       className="messaging-nav"
    //       onMouseEnter={() => enterMessage()}
    //       onMouseLeave={() => exitMessage()}
    //     >
    //       <a className="cursor-pointer">
    //         {hoverMessage ? (
    //           <img
    //             className="h-12"
    //             src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAYpJREFUWEftl91NwzAUhY8rpOYNNqCVxR5sACN0A5J0ANIBaNiAsklHgGcUNd0A3pI+xMiQRo6Vn2vh/CDFj4l9/fnce+VjhpENNjIe/F+gaDt/BnAHYGFJ1RhM7Lh32qjxSArlMA+WQMphBNvwdRKcP1KBPgFcdgIExNxPl0ZAtkAOobPIMqzAxKMak/tpIQxJIVtA5zjRkxOoUIMD/SglxOEM2AjUVzdF27loBeqzm6hAvXUTFahSxr8Udd3GE1DR4jXFOyk0KUTtPEKXHbmfFpamdJfVLaZuXjWvFajJfvQMFEOwneqF5IEGU6hO9QmorR51heovV634ft2fCMFw37ZJ/r/UTbSUaU6utEgByh2fNP1XRBhAOxAJSE7KN1sBuNaBshn2MyFeDJ9Cx6puIgOpEzXvK9OpK/KeMebeeMmerFTLxEaTr5txJdYXBAK+TuXj0eowBmIQr4yd3KUHqZj1YQJkPT1Vp6EAuV2lxxjoI3RuL5C8dZUeYyDrBUIIOMhTuolrdEDfmrYjNE2GppkAAAAASUVORK5CYII="
    //           />
    //         ) : (
    //           <img
    //             className="h-12"
    //             src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAYRJREFUWEftl+9NwzAQxd+JICG1EmxA2YQNYIBaKhOQDUgngA1alEU6AkxAukErNXyqdMhVmsYhcS7F+YMUf0zs88/v7uRnQs8G9YwH/xeIw9EbCA9gTJyoSojAvCT1Pc/GEyl0gAGenYD8CkJzUrvg+FkKtAFw3QgQIaJpfFcLyBUIL64m8LwZwC9GmlScCiNSyBXQMQ6H4yALRZ0DHZS6+ErTZANqq5s4HHElUJvdJAVqrZukQIUy/qWoyzYegE4tXly8g0KDQtLOE3TZmlScWhrjLitbLN28aF41kMV+tAwUAbTMeiF9oM4UKlN9AKqqx7xClsvVLL7E/b0C/Fi1SfLf6CZhykwnZy46ASWOT5v+GyGMLlfDzIuA9KRksxmA2zwQgBWIFzWfQuuibhIDZSfmvK9OZ16RT4B8UruVXCn7TKvJz5vxTKgtCAFNY/1eczrOAXrH/tKnp41WzPmoA+Q8PUWnkQD5TaXnHKB77L2PptJTG8h5gQgCdvKUtnH1DugH6YgTNGtuzT0AAAAASUVORK5CYII="
    //           />
    //         )}
    //       </a>
    //     </div>
    //     <div
    //       className="search-nav"
    //       onMouseEnter={() => {
    //         enterSearch();
    //       }}
    //       onMouseLeave={() => exitSearch()}
    //     >
    //       <a className="cursor-pointer">
    //         {hoverSearch ? (
    //           <img
    //             className="h-12"
    //             src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAArBJREFUWEftl1tSGkEUhv/TVIS3uARhzLO4gsAKxBUEd8AMC4guQCAryGQFwRWErCDjc1B0B/BGa9kndci04TZ0j5aUqbJfu/v0N/+5DuGVLXplPPh/gUbd0p5hPgKjBsIegGqqbgLGDQgDRXRRDqc3z1HdqdAMBOYzmJpeDxHHCursqWAbgYbdnQYxfQWw6wXz79CYiU/2w7t+znvZMTQ8LzWJWGAeFwM/wRQX1ENSDu8T2Rh131UfTKEK4iYBHxfOM53st6dxHqi1CqXKfJ8zdGmIWh/C6WCT8d/dUk0x9wAc2HNMfJxHqRWgNHh/zbnpUpGulUOMfb501MWu4aKAW6ixIl32vb8CdN3ZiRn0KX08F4wFXoYi8LdKdOeVFAtAqToja9gQ1V1uylItdd8Pu6+Iyj6ZtwB0dV5sgdAVIxLA+5Gu+bgp68ywUxw8BjojDNpa4mvjWgC67hT7DBzNgJ6QIcsvzWcqAReVSDdyAV11ipLKs2BUZA5taruMZO1LSTCsJEFkJUGkD122Fl3WKbK9EETaWcVdxmX/KqfNbQJNgkg7K/4y0Iu5zDdJthbUAL4EkW653JyZ9gQMKpGuuwxs2n922r9gYZwo0ns+7cPVOhJFuu5jaF6ptHVIlf47xDGdBe3pqY/aWc1Vgvu9rR95oFZggFtFuur7Ub7jR2KIQldfS/uXtB473koP6gdtfeyjjpzJLH7rBjQJdAOKC/RwuTCgceFAgZsMrO99xHEQ3p34QPmMsDLxWff52JQztwQkti/OLnlCOduDZB6zOZ2bkTZBTcDUU2rak5hZmq28oJxA9vVZSTDcIEKNMfsNkiY8YSARNeRXSCkdLwdvXihvIF9frTuXB2orQALpC7U1oGWorAFwq0AWyrAaZP2vbR3IFYtvQG8KuRRw7f8BG656NPOijo0AAAAASUVORK5CYII="
    //           />
    //         ) : (
    //           <img
    //             className="h-12"
    //             src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAppJREFUWEftl1Fu2kAQhv8psVTVkcoRyAlCTlA4QZLnsm24ATlBmxOUngBat88lJyg5Qc0JSm4AEltVwmSqMWvAgL3rRLFSKSv5yevx539mdn4TntiiJ8aD/xeIey9rOKicAtQAuAagbtQNARoDPES0uKb23/FDVLcqFIN4lQ9gXDi9iNDHfHF1X7BcIA5enQHUA1B1gllvmgDcJvVnUPC57Brir/4FCAKzuW7A6KOCkN7qUG7wd7+OBeqgWME3qd2MNr3T/SJQexUyyvzYCDQCqENqNswLzsGh1FcXwPF6H58XUWoHyBTvr400jRB5DWpPJi5fyr1qFQdzAU+gJoi8I9fnd4ECXyR+b15eCCYB3gP1hZR2aooUkFHn91oJatrSlKWaSd/P1f1oceTSeWmgb34HjE8myA0p3XBJUzaUL6lbFjrhklpa6it3bQEdDsB8Gj9xjw7ZflOqU4muqTU7KwYU+NLKy2J8gZOktW1BMhWSI+EO0iCyQlL6xBYrrVDgc/IAKW09xW3BY6ELxiwTaEpKW0/8baDHTJlTk5RX1MBnUrpjS3Ne2w9J6aYtQN59Dh7a9kvP8xgH4xSRV3MZH7bRESLymi6BNpUyo0NOaWPi6IrU7KOL2lnDVYr7dXJ+FIHahcEtIq/u+lGu9kNs6qVtrpn5JaMnsbcyMwakZucu6iwnTMbKMGhDiEUljFIGjXFsLO7+2UfoU0u3XaBcLKzYkSR9LjFlzy2IwtVcXH66E5R1PBhLIgWZeKQ8qClAXUQHXakZTnsrJygrUPJ28/chpr8Bjn+DZAhPZWjGF2GMudffLt6iUM5Arrnat68IVClAZupvWuPM9JUGtAOVYQBLBVpBMYZZ/2ulA9lq8RnoWSGbArb7/wCB8zg0nEbdVwAAAABJRU5ErkJggg=="
    //           />
    //         )}
    //       </a>
    //     </div>
    //   </div>
    //   <div id="chat-nav-left" className="border border-gray-800 flex hidden">
    //     Message
    //   </div>
    //   <div id="search-nav-left" className="border border-gray-800 flex hidden">
    //     Search
    //   </div>
    // </div>


    

};


export default LeftNavBar;
