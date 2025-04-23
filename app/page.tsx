export default function Home() {
    return (
        <div className="grid min-h-screen p-8 pb-20 gap-16 sm:p-20">
            {/* Color Showcase Section */}
            <section className="space-y-8">
                <h1 className="text-display-large text-primary-100">Theme Showcase</h1>
                
                {/* Primary Colors */}
                <div className="space-y-4">
                    <h2 className="text-headline-medium text-dark-100">Primary Colors</h2>
                    <div className="flex gap-4">
                        <div className="w-20 h-20 bg-primary-100 rounded-lg"></div>
                        <div className="w-20 h-20 bg-primary-200 rounded-lg"></div>
                        <div className="w-20 h-20 bg-primary-300 rounded-lg"></div>
                        <div className="w-20 h-20 bg-primary-400 rounded-lg"></div>
                    </div>
                </div>

                {/* Dark Colors */}
                <div className="space-y-4">
                    <h2 className="text-headline-small text-dark-200">Dark Colors</h2>
                    <div className="flex gap-4">
                        <div className="w-20 h-20 bg-dark-100 rounded-lg"></div>
                        <div className="w-20 h-20 bg-dark-200 rounded-lg"></div>
                        <div className="w-20 h-20 bg-dark-300 rounded-lg"></div>
                        <div className="w-20 h-20 bg-dark-400 rounded-lg"></div>
                        <div className="w-20 h-20 bg-dark-500 rounded-lg"></div>
                    </div>
                </div>

                {/* Light Colors */}
                <div className="space-y-4">
                    <h2 className="text-title-large text-dark-300">Light Colors</h2>
                    <div className="flex gap-4">
                        <div className="w-20 h-20 bg-light-100 border border-dark-100 rounded-lg"></div>
                        <div className="w-20 h-20 bg-light-200 rounded-lg"></div>
                    </div>
                </div>

                {/* Indicator Colors */}
                <div className="space-y-4">
                    <h2 className="text-body-large text-dark-300">Indicator Colors</h2>
                    <div className="flex gap-4">
                        <div className="w-20 h-20 bg-indicator-100 rounded-lg"></div>
                        <div className="w-20 h-20 bg-indicator-200 rounded-lg"></div>
                        <div className="w-20 h-20 bg-indicator-300 rounded-lg"></div>
                        <div className="w-20 h-20 bg-indicator-400 rounded-lg"></div>
                        <div className="w-20 h-20 bg-indicator-500 rounded-lg"></div>
                    </div>
                </div>
            </section>

            {/* Typography Showcase */}
            <section className="space-y-8">
                <h2 className="text-display-medium text-primary-100">Typography</h2>
                <div className="space-y-4">
                    <p className="text-body-large">Body Large Text Example</p>
                    <p className="text-body-medium">Body Medium Text Example</p>
                    <p className="text-body-small">Body Small Text Example</p>
                    <p className="text-body-tiny">Body Tiny Text Example</p>
                    <p className="text-body-micro">Body Micro Text Example</p>
                    <p className="text-table-header">Table Header Text Example</p>
                    <p className="text-table-content">Table Content Text Example</p>
                    <button className="text-button-large bg-primary-100 text-light-100 px-6 py-3 rounded-lg">
                        Button Large Text
                    </button>
                </div>
            </section>

            {/* Gradient and Blur Showcase */}
            <section className="space-y-8">
                <h2 className="text-display-small text-primary-100">Effects</h2>
                <div className="flex gap-8">
                    <div className="w-64 h-32 bg-gradient-primary rounded-lg"></div>
                    <div className="relative w-64 h-32">
                        <div className="absolute inset-0 bg-primary-100 backdrop-blur-60 rounded-lg"></div>
                        <div className="absolute inset-0 flex items-center justify-center text-light-100">
                            Backdrop Blur
                        </div>
                    </div>
                </div>
            </section>

            {/* Responsive Design Note */}
            <section className="space-y-4">
                <p className="text-body-medium text-dark-200">
                    Responsive Breakpoints: sm:700px | md:924px | lg:1100px | xl:1320px | 2xl:1536px
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    <div className="h-20 bg-primary-200 rounded-lg flex items-center justify-center">1</div>
                    <div className="h-20 bg-primary-200 rounded-lg flex items-center justify-center">2</div>
                    <div className="h-20 bg-primary-200 rounded-lg flex items-center justify-center">3</div>
                    <div className="h-20 bg-primary-200 rounded-lg flex items-center justify-center">4</div>
                    <div className="h-20 bg-primary-200 rounded-lg flex items-center justify-center">5</div>
                </div>
            </section>
        </div>
    );
}
