import Head from 'next/head';
import { SketchPicker } from 'react-color';
import { useState } from 'react';
import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState('#add8e6');
  const [colors, setColors] = useState(null);
  const [mode, setMode] = useState('');

  const colorStr = color.slice(1);

  const getColors = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://www.thecolorapi.com/scheme?hex=${colorStr}&mode=${mode}&count=5`
      );
      setColors(response.data.colors);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="">
      <Head>
        <title>Palett</title>
        <meta name="description" content="Generate Color Palette" />
      </Head>

      <main>
        <div className="flex flex-col md:px-12 px-4 bg-background font-poppins min-h-screen bg-gray-100 items-center ">
          <h1 className="md:text-6xl text-4xl font-bold text-primary mt-10">
            <span className="text-indigo-500">Pallet!</span> the Color Generator
          </h1>
          <h2 className="text-2xl font-light mt-6 font-ebas">
            Pick a color you want and choose a mode
          </h2>
          <div class="mt-16 flex flex-wrap w-full">
            <div class="flex justify-center items-center w-1/3 ml-auto">
              <SketchPicker
                color={color}
                onChange={(updatedColor) => setColor(updatedColor.hex)}
              />
            </div>

            <div class=" w-1/3 mr-auto">
              <select
                id="modeSelected"
                class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                onChange={(e) => setMode(e.target.value)}
              >
                <option defaultValue="monochrome">Choose a mode</option>
                <option value="monochrome">Monochrome</option>
                <option value="monochrome-dark">Monochrome-dark</option>
                <option value="monochrome-light">Monochrome-light</option>
                <option value="analogic">Analogic</option>
                <option value="complement">Complement</option>
                <option value="analogic-complement">Analogic-complement</option>
                <option value="triad">Triad</option>
                <option value="quad">Quad</option>
              </select>
              <button
                type="submit"
                class="mt-10 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={() => {
                  getColors();
                }}
              >
                {loading ? (
                  <span className="animate-pulse">Loading..</span>
                ) : (
                  <>Get Color Scheme &rarr;</>
                )}
              </button>
            </div>
          </div>
          {colors && (
            <div className="w-11/12 mt-10 grid grid-cols-5">
              {colors.map((color, index) => {
                return (
                  <div
                    key={index}
                    className="text-primary font-sans Roboto text-center sm:text-xl text-sm sm:px-12 py-24 relative group"
                    style={{
                      backgroundColor: color.hex.value,
                      color: color.contrast.value,
                    }}
                  >
                    <div className="cursor-pointer group-hover:opacity-0">
                      {color.name.value}
                    </div>

                    <div className="z-50 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out cursor-pointer absolute to-transparent inset-x-0 bottom-5">
                      <div className="transform-gpu  p-4 space-y-3 text-xl group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 transform transition duration-300 ease-in-out">
                        <div
                          onClick={() => {
                            navigator.clipboard.writeText(color.hex.value);
                            toast.success('Successfully copied to clipboard!', {
                              position: toast.POSITION.TOP_CENTER,
                              autoClose: 1000,
                              hideProgressBar: true,
                            });
                          }}
                        >
                          {color.hex.value}
                        </div>

                        <div
                          onClick={() => {
                            navigator.clipboard.writeText(color.cmyk.value);
                            toast.success('Successfully copied to clipboard!', {
                              position: toast.POSITION.TOP_CENTER,
                              autoClose: 1000,
                              hideProgressBar: true,
                            });
                          }}
                        >
                          {color.cmyk.value}
                        </div>
                        <div
                          onClick={() => {
                            navigator.clipboard.writeText(color.hsv.value);
                            toast.success('Successfully copied to clipboard!', {
                              position: toast.POSITION.TOP_CENTER,
                              autoClose: 1000,
                              hideProgressBar: true,
                            });
                          }}
                        >
                          {color.hsv.value}
                        </div>
                        <div
                          onClick={() => {
                            navigator.clipboard.writeText(color.rgb.value);
                            toast.success('Successfully copied to clipboard!', {
                              position: toast.POSITION.TOP_CENTER,
                              autoClose: 1000,
                              hideProgressBar: true,
                            });
                          }}
                        >
                          {color.rgb.value}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
