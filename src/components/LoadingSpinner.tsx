type Props = {};

function LoadingSpinner({}: Props) {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
}

export default LoadingSpinner;
