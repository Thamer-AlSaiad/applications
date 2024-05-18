export const FormContainer = ({ children }) => {
  return (
    <main className="w-full min-h-screen bg-yellow-light flex justify-center items-center">
      <div className="m-4 p-8 bg-secondary rounded-xl max-w-md w-[26rem]">
        {children}
      </div>
    </main>
  );
};
