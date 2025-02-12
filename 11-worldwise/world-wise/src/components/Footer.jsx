export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
          <div>
            <h3 className="text-xl font-bold mb-4">FoM Reserved</h3>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-center">
          <p>
            &copy; {new Date().getFullYear()} Vite Trial Project. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
