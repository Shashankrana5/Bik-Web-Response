function Loading() {
  return (
    <div className="flex w-[100vw] h-[100vh] justify-center items-center space-x-1 text-sm text-gray-700 bg-gray-300 absolute z-[100]">
      <svg
        fill="none"
        className="w-32 h-32 animate-spin"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clipRule="evenodd"
          d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </svg>

      <div className="text-2xl">Loading ...</div>
    </div>
  );
}

export default Loading;
