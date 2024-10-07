/* eslint-disable react/prop-types */

function SummeryVercel({resmeInfo}) {
    return (
        <section className="mb-8">
          <h2 className="text-3xl font-serif mb-4">Summary</h2>
          <p className="text-lg">
            {resmeInfo?.summery}
          </p>
        </section>
      )
}

export default SummeryVercel