import React from "react";

export default function Header() {
    return (
        <div class="bg-white-800 py-4 header-shadow fixed top-0 left-0 w-full bg-white">
            <div class="container mx-auto px-4 md:px-0 flex justify-between items-center">
                <div class="flex-shrink-0">
                    <img src="swiggy-logo.png" width="120" alt="Swiggy Logo" class="md:w-150" />
                </div>
                <div class="flex-shrink">
                    <form class="flex items-center max-w-xs mx-auto">
                        <div class="relative">
                            <input type="text" placeholder="Search for restaurant and food" class="bg-gray-100 w-64 h-10 px-4 pr-10 rounded-lg text-sm focus:outline-none " />
                            <button type="button" class="absolute top-0 right-0 mt-3 mr-3" aria-label="Search">
                                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 21" fill="none" aria-hidden="true">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0998 8.84232C13.0998 11.7418 10.7493 14.0922 7.84989 14.0922C4.95046 14.0922 2.6 11.7418 2.6 8.84232C2.6 5.94289 4.95046 3.59243 7.84989 3.59243C10.7493 3.59243 13.0998 5.94289 13.0998 8.84232ZM12.1431 14.1802C10.9686 15.1261 9.47534 15.6922 7.84989 15.6922C4.0668 15.6922 1 12.6254 1 8.84232C1 5.05923 4.0668 1.99243 7.84989 1.99243C11.633 1.99243 14.6998 5.05923 14.6998 8.84232C14.6998 10.4974 14.1128 12.0153 13.1357 13.1993L18.319 17.9606C18.7226 18.3313 18.7359 18.9637 18.3483 19.3511C17.9634 19.7357 17.3365 19.7254 16.9645 19.3282L12.1431 14.1802Z" fill="#333333" fill-opacity="0.5"></path>
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}