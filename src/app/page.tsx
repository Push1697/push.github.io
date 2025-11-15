import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm z-50 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Pushpendra
          </span>
          <Link
            href="/blog"
            className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
          >
            <BookOpen className="w-5 h-5" />
            <span>Blog</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <section className="text-center py-20">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Hi, I'm <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Pushpendra</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
              Cloud Infrastructure | DevOps | AWS | Kubernetes
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
              Building scalable, resilient systems with cloud technologies. Sharing insights and real-world solutions.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                Read Blog
              </Link>
              <a
                href="https://github.com/push1697"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-8 py-3 rounded-full font-semibold transition-colors"
              >
                GitHub
              </a>
            </div>
          </section>

          {/* About Section */}
          <section className="py-16 md:py-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  About Me
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                  I'm a passionate DevOps engineer and cloud architect with expertise in designing and deploying cloud infrastructure at scale.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                  With hands-on experience in AWS, Kubernetes, and modern DevOps practices, I help teams build robust, scalable systems.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  I love sharing knowledge through my blog and contributing to open-source projects.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Skills</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    Cloud: AWS, GCP, Azure
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    Containers: Docker, Kubernetes, ECS
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    IaC: Terraform, CloudFormation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    CI/CD: GitHub Actions, Jenkins
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    Monitoring: Prometheus, ELK Stack
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 text-center bg-blue-50 dark:bg-gray-800 rounded-xl p-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Explore My Work
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Check out my latest blog posts and insights on cloud infrastructure and DevOps
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              Visit Blog
            </Link>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 Pushpendra Bairwa. All rights reserved.</p>
          <p className="text-sm mt-2">Hosted with ❤️ on GitHub Pages</p>
        </div>
      </footer>
    </div>
  );
}
