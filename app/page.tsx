export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <nav className="border-b-4 border-black px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-3xl font-bold">Neobrutal UI</div>
          <div className="flex gap-4 items-center">
            <a href="#components" className="hover:underline font-medium text-lg">
              Components
            </a>
            <button className="border-4 border-black px-4 py-2 bg-black text-white font-bold hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <section className="px-6 py-20 max-w-6xl mx-auto text-center">
        <div className="space-y-12">
          <div className="space-y-6">
            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              Bold UI for<br />
              Bold Designers
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Neobrutal UI is a React component library celebrating raw, unapologetic design.
              Thick borders, solid colors, and uncompromising aesthetics.
            </p>
          </div>

          <div className="flex gap-6 justify-center flex-wrap">
            <button className="border-4 border-black bg-black text-white px-8 py-4 font-bold text-xl hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all">
              View Components
            </button>
            <button className="border-4 border-black bg-white text-black px-8 py-4 font-bold text-xl hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all">
              Get Started
            </button>
          </div>
        </div>
      </section>

      <section id="components" className="bg-gray-100 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center">Component Examples</h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold">Buttons</h3>
              <div className="space-y-4">
                <button className="border-4 border-black bg-black text-white px-6 py-3 font-bold text-lg hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all w-full">
                  Primary Button
                </button>
                <button className="border-4 border-black bg-white text-black px-6 py-3 font-bold text-lg hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all w-full">
                  Secondary Button
                </button>
                <button className="border-4 border-green-500 bg-green-500 text-white px-6 py-3 font-bold text-lg hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all w-full">
                  Success Button
                </button>
                <button className="border-4 border-red-500 bg-red-500 text-white px-6 py-3 font-bold text-lg hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all w-full">
                  Error Button
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-bold">Card</h3>
              <div className="border-4 border-black bg-white p-8 space-y-4 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all">
                <h4 className="text-2xl font-bold">Neobrutal Card</h4>
                <p className="text-gray-600 text-lg">
                  This is an example of a neobrutal card component with thick borders and solid colors.
                </p>
                <button className="border-2 border-black bg-black text-white px-4 py-2 font-bold hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all">
                  Action
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-bold">Input</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter text..."
                  className="w-full border-4 border-black bg-white px-4 py-3 font-medium text-lg focus:shadow-[4px_4px_0px_rgba(0,0,0,1)] outline-none"
                />
                <input
                  type="email"
                  placeholder="Enter email..."
                  className="w-full border-4 border-black bg-white px-4 py-3 font-medium text-lg focus:shadow-[4px_4px_0px_rgba(0,0,0,1)] outline-none"
                />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-bold">Alert</h3>
              <div className="border-4 border-green-500 bg-green-500 text-white p-6 space-y-3">
                <div className="font-bold text-xl">Success!</div>
                <div className="text-lg">Your action was completed successfully.</div>
              </div>
              <div className="border-4 border-red-500 bg-red-500 text-white p-6 space-y-3">
                <div className="font-bold text-xl">Error!</div>
                <div className="text-lg">Something went wrong. Please try again.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t-4 border-black px-6 py-12 bg-gray-200">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to build?</h3>
          <p className="text-gray-600 mb-8 text-lg">
            Start creating bold, unapologetic interfaces with Neobrutal UI.
          </p>
          <button className="border-4 border-black bg-black text-white px-8 py-4 font-bold text-xl hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all">
            Get Started Now
          </button>
        </div>
      </footer>
    </div>
  );
}
