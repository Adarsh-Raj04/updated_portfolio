import { MapPin } from 'lucide-react';

export default function Experience() {
    const experience = [
        {
            title: "Data and AI Engineer",
            company: "GSK (GlaxoSmithKline)",
            location: "Bengaluru, Karnataka, India",
            period: "August 2024 – Present",
            highlights: [
                "Architect and deploy end-to-end data pipelines using Azure Databricks and Azure Data Factory, processing large-scale pharmaceutical datasets to support critical business intelligence and regulatory reporting requirements",
                "Design and implement scalable ETL/ELT workflows leveraging Hive, PySpark, and SQL, optimizing data processing efficiency and reducing pipeline execution time by implementing performance tuning strategies",
                "Drive AI/ML initiatives by building predictive models and analytical frameworks that enable data-driven decision-making across drug development, supply chain, and commercial operations",
                "Collaborate with cross-functional teams including Data Scientists, Business Analysts, and Product Owners to translate complex business requirements into robust technical solutions within the Azure ecosystem",
                "Automate data quality checks, monitoring, and alerting systems to ensure data integrity, compliance with GxP standards, and continuous pipeline reliability",
                "Optimize cloud infrastructure costs and performance through efficient resource management, query optimization, and implementation of best practices in Azure cloud architecture"
            ]
        },
        {
            title: "Graduate Intern – Data Engineering",
            company: "GSK (GlaxoSmithKline)",
            location: "Bengaluru, Karnataka, India",
            period: "January 2024 – August 2024",
            highlights: [
                "Developed data ingestion pipelines and transformation logic using Azure Data Factory and Databricks, contributing to enterprise-scale data warehouse modernization initiatives",
                "Performed data profiling, cleansing, and validation to ensure high-quality datasets for analytics and machine learning applications",
                "Assisted in migrating legacy data systems to cloud-native Azure solutions, improving scalability and reducing operational overhead"
            ]
        }
    ];

    return (
        <section id="experience" className="py-32 bg-gradient-to-b from-transparent to-[#0f172a]/50">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="font-orbitron text-5xl font-bold mb-16 text-center">
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">EXPERIENCE</span>
                </h2>

                <div className="space-y-12 pl-8 timeline-line">
                    {experience.map((job, index) => (
                        <div key={index} className="relative">
                            <div className="absolute -left-8 top-2 w-4 h-4 rounded-full bg-blue-500 ring-4 ring-blue-500/20" />

                            <div className="gradient-border rounded-xl p-8 ml-4">
                                <div className="flex items-start justify-between mb-4 flex-wrap gap-4">
                                    <div>
                                        <h3 className="font-orbitron text-2xl font-bold text-blue-300 mb-2">{job.title}</h3>
                                        <div className="font-space text-lg text-purple-300">{job.company}</div>
                                        <div className="font-jetbrains text-sm text-gray-400 mt-1 flex items-center gap-2">
                                            <MapPin className="w-4 h-4" />
                                            {job.location}
                                        </div>
                                    </div>
                                    <div className="font-space text-sm text-blue-400 bg-blue-500/10 px-4 py-2 rounded-lg border border-blue-500/30">
                                        {job.period}
                                    </div>
                                </div>

                                <ul className="space-y-3 font-jetbrains text-gray-300">
                                    {job.highlights.map((highlight, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="text-blue-400 mt-1">▹</span>
                                            <span>{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}