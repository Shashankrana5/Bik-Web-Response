import { useState } from "react";
import { TiEdit } from 'react-icons/ti';
import {
	Input,
	Ripple,
	initTE,
  } from "tw-elements";
  
  initTE({ Input, Ripple });


export const FrontendPlayground = () => {

	const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
		setIsModalOpen(true);
	};
    const closeModal = () => {
		setIsModalOpen(false);
	};



//     return(
//         <div>
//             <>
// 			<div className="container mx-auto bg-white shadow-lg">
// 				<div className="flex items-center justify-center h-screen ">
// 					<button
// 						onClick={openModal}
// 						className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-orange-500 px-4 py-2 text-white font-semibold text-md tracking-wider uppercase rounded-md"
// 					>
// 						Deactivate
// 					</button>
// 				</div>
// 			</div>
// 		</>

// <div
// 			className={`fixed z-10 inset-0 overflow-y-auto ${
// 				isModalOpen ? '' : 'hidden'
// 			}`}
// 		>
// 			<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
// 				<div
// 					className="fixed inset-0 transition-opacity"
// 					aria-hidden="true"
// 				>
// 					<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
// 				</div>

// 				<span
// 					className="hidden sm:inline-block sm:align-middle sm:h-screen"
// 					aria-hidden="true"
// 				>
// 					&#8203;
// 				</span>

// 				<div
// 					className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
// 					role="dialog"
// 					aria-modal="true"
// 					aria-labelledby="modal-headline"
// 				>
// 					<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
// 						<div className="sm:flex sm:items-start">
// 							<div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 sm:mx-0 sm:h-10 sm:w-10">
// 								<TiEdit className="h-6 w-6 text-orange-300"></TiEdit>
// 							</div>
// 							<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
// 								<h3
// 									className="text-lg leading-6 font-medium text-gray-900"
// 									id="modal-headline"
// 								>
// 									Deactivate account
// 								</h3>
// 								<div className="mt-2">
// 									<p className="text-sm text-gray-500">
// 										Are you sure you want to deactivate your
// 										account? All of your data will be
// 										permanently removed. This action cannot
// 										be undone.
// 									</p>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 					<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
// 						<button
// 							onClick={closeModal}
// 							type="button"
// 							className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-600 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:ml-3 sm:w-auto sm:text-sm"
// 						>
// 							Deactivate
// 						</button>
// 						<button
// 							onClick={closeModal}
// 							type="button"
// 							className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
// 						>
// 							Cancel
// 						</button>
// 					</div>
// 				</div>
// 			</div>
// 		</div>

//         </div>
//     )


//login form
// return (
	// <section className="bg-gray-100 min-h-screen flex box-border justify-center items-center font-fam">
    //     <div className="bg-[#dfa674] rounded-2xl flex max-w-3xl p-5 items-center">
    //         <div className="md:w-1/2 px-8">
    //             <h2 className="font-bold text-3xl text-[#002D74]">Login</h2>
    //             <p className="text-sm mt-4 text-[#002D74]">If you already a member, easily log in now.</p>

    //             <form action="" className="flex flex-col gap-4">
    //                 <input className="p-2 mt-8 rounded-xl border" type="email" name="email" placeholder="Email" />
    //                 <div className="relative">
    //                     <input className="p-2 rounded-xl border w-full" type="password" name="password" id="password"
    //                         placeholder="Password" />
    //                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" id="togglePassword"
    //                         className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer z-20 opacity-100"
    //                         viewBox="0 0 16 16">
    //                         <path
    //                             d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
    //                         <path
    //                             d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
    //                     </svg>
    //                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
    //                         className="bi bi-eye-slash-fill absolute top-1/2 right-3 -z-1 -translate-y-1/2 cursor-pointer hidden"
    //                         id="mama" viewBox="0 0 16 16">
    //                         <path
    //                             d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
    //                         <path
    //                             d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
    //                     </svg>
    //                 </div>
    //                 <button
    //                     className="bg-[#002D74] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium"
    //                     type="submit">Login</button>
    //             </form>
    //             <div className="mt-10 grid  items-center text-gray-500 or-grid">
    //                 <hr className="border-gray-400" />
    //                 <p className="text-center text-sm">OR</p>
    //                 <hr className="border-gray-400"/>
    //             </div>
    //             <button
    //                 className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-[#60a8bc4f] font-medium">
    //                 <svg className="mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="25px">
    //                     <path fill="#FFC107"
    //                         d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
    //                     <path fill="#FF3D00"
    //                         d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
    //                     <path fill="#4CAF50"
    //                         d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
    //                     <path fill="#1976D2"
    //                         d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
    //                 </svg>

    //                 Login with Google
    //             </button>
    //             <div   className="mt-10 text-sm border-b border-gray-500 py-5 playfair tooltip">Forget password?</div>

    //             <div className="mt-4 text-sm flex justify-between items-center container-mr">
    //                 <p className="mr-3 md:mr-0 ">If you don't have an account..</p>
    //                 <button
    //                     className="hover:border register text-white bg-[#002D74] hover:border-gray-400 rounded-xl py-2 px-5 hover:scale-110 hover:bg-[#002c7424] font-semibold duration-300">Register</button>
    //             </div>
    //         </div>
    //         <div className="md:block hidden w-1/2">
    //             <img className="rounded-2xl max-h-[1600px]" src="fun.jpg" alt="login form image" />
    //         </div>
    //     </div>
    // </section>
// )


//login form from tw-element 
return (
	<section className="h-screen">
  <div className="h-full">
    <div
      className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
      <div
        className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="w-full"
          alt="Sample image" />
      </div>

      <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
        <form>
          <div
            className="flex flex-row items-center justify-center lg:justify-start">
            <p className="mb-0 mr-4 text-lg">Sign in with</p>

            <button
              type="button"
              data-te-ripple-init
              data-te-ripple-color="light"
              className="mx-1 h-9 w-9 rounded-full bg-primary uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-3.5 w-3.5"
                fill="currentColor"
                viewBox="0 0 24 24">
                <path
                  d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </button>

            <button
              type="button"
              data-te-ripple-init
              data-te-ripple-color="light"
              className="mx-1 h-9 w-9 rounded-full bg-primary uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-3.5 w-3.5"
                fill="currentColor"
                viewBox="0 0 24 24">
                <path
                  d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </button>


            <button
              type="button"
              data-te-ripple-init
              data-te-ripple-color="light"
              className="mx-1 h-9 w-9 rounded-full bg-primary uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-3.5 w-3.5"
                fill="currentColor"
                viewBox="0 0 24 24">
                <path
                  d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
              </svg>
            </button>
          </div>


          <div
            className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p
              className="mx-4 mb-0 text-center font-semibold dark:text-white">
              Or
            </p>
          </div>


          <div className="relative mb-6" data-te-input-wrapper-init>
            <input
              type="text"
              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleFormControlInput2"
              placeholder="Email address" />
            <label

              className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
              >Email address
            </label>
          </div>


          <div className="relative mb-6" data-te-input-wrapper-init>
            <input
              type="password"
              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleFormControlInput22"
              placeholder="Password" />
            <label

              className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
              >Password
            </label>
          </div>

          <div className="mb-6 flex items-center justify-between">

            <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
              <input
                className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                type="checkbox"
                value=""
                id="exampleCheck2" />
              <label
                className="inline-block pl-[0.15rem] hover:cursor-pointer">
                Remember me
              </label>
            </div>


            <a href="#!">Forgot password?</a>
          </div>


          <div className="text-center lg:text-left">
            <button
              type="button"
              className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              data-te-ripple-init
              data-te-ripple-color="light">
              Login
            </button>


            <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
              Don't have an account?
     
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
)
}