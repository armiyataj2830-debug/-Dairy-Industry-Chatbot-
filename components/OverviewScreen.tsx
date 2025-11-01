import React from 'react';
import { Link } from 'react-router-dom';
import { ChatIcon } from './icons';

const OverviewScreen: React.FC = () => {
    return (
        <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 md:p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto pb-24">
                <header className="mb-8">
                    <h1
                        className="text-4xl md:text-5xl font-extrabold text-blue-900 tracking-tight mb-2 animate-fade-in-slide-up"
                        style={{ opacity: 0 }}
                    >
                        Karnataka Dairy Industry
                    </h1>
                    <p
                        className="text-lg text-gray-600 animate-fade-in-slide-up"
                        style={{ animationDelay: '150ms', opacity: 0 }}
                    >
                        An Overview of the White Revolution in the State
                    </p>
                </header>

                <main className="space-y-8">
                    <div
                        className="bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in-slide-up"
                        style={{ animationDelay: '300ms', opacity: 0 }}
                    >
                        <img 
                            src="https://images.unsplash.com/photo-1620189507195-68309c04c4d0?q=80&w=800&auto=format&fit=crop" 
                            alt="Nandini dairy products" 
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-blue-800 mb-3">The Nandini Brand</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Nandini is the household name for dairy products from the Karnataka Milk Federation (KMF). It's one of the most beloved brands in India, second only to Amul. The brand represents purity, quality, and the cooperative spirit of millions of farmers. Nandini offers a wide range of products including milk, curd, ghee, butter, ice cream, and sweets.
                            </p>
                        </div>
                    </div>

                    <div
                        className="bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in-slide-up"
                        style={{ animationDelay: '450ms', opacity: 0 }}
                    >
                         <img 
                            src="https://images.unsplash.com/photo-1590324312431-b37a67523136?q=80&w=800&auto=format&fit=crop" 
                            alt="A dairy farmer with a cow" 
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-blue-800 mb-3">Karnataka Milk Federation (KMF)</h2>
                            <p className="text-gray-700 leading-relaxed">
                                KMF is the largest cooperative dairy federation in South India, owned and managed by milk producers of Karnataka. It was founded in 1974 as the Karnataka Dairy Development Corporation (KDDC) and was placed under the cooperative fold in 1984. KMF has a three-tiered structure: Dairy Cooperative Societies at the village level, District Milk Unions at the district level, and the Federation at the state level. This structure ensures that farmers are empowered and receive fair compensation for their produce.
                            </p>
                        </div>
                    </div>

                    <div
                        className="bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in-slide-up"
                        style={{ animationDelay: '600ms', opacity: 0 }}
                    >
                        <img 
                            src="https://images.unsplash.com/photo-1444987715545-35b5ac523145?q=80&w=800&auto=format&fit=crop" 
                            alt="Cows grazing in a field in Karnataka" 
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-blue-800 mb-3">Production and History</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Karnataka is one of the leading milk-producing states in India. The dairy industry here has a rich history rooted in the cooperative movement, aimed at rural development and empowering small and marginal farmers. The success of KMF and the Nandini brand is a testament to the effective implementation of Operation Flood, which transformed India from a milk-deficient nation into the world's largest milk producer.
                            </p>
                        </div>
                    </div>
                </main>
            </div>

            <Link
                to="/chat"
                className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors animate-pulse-chat"
                aria-label="Open chatbot"
            >
                <ChatIcon className="w-8 h-8" />
            </Link>
        </div>
    );
};

export default OverviewScreen;