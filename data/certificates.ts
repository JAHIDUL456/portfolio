export type Certificate = {
  id: string;
  image: string;
  title: string;
  issuer?: string;
  date?: string;
};

/**
 * The ONLY certificates showcased on the portfolio.
 * To add a new one later: drop the image into /public/certificates
 * and append an entry here — the exhibition adapts automatically.
 *
 * Titles are derived from the source filenames. `issuer` is only set
 * where the filename explicitly names the organization. `date` is set
 * only where it is known (from the filename).
 */
export const certificates: Certificate[] = [
  {
    id: "c-2020a",
    image: "/certificates/cert-2020a.jpg",
    title: "Certificate",
    date: "2020",
  },
  {
    id: "c-2020b",
    image: "/certificates/cert-2020b.jpg",
    title: "Certificate",
    date: "2020",
  },
  {
    id: "c-html5",
    image: "/certificates/cert-html5.jpg",
    title: "HTML5",
  },
  {
    id: "c-css3",
    image: "/certificates/cert-css3.jpg",
    title: "CSS3",
  },
  {
    id: "c-javascript",
    image: "/certificates/cert-javascript.jpg",
    title: "JavaScript",
  },
  {
    id: "c-python",
    image: "/certificates/cert-python.jpg",
    title: "Python",
  },
  {
    id: "c-responsive",
    image: "/certificates/cert-responsive.jpg",
    title: "Responsive Web Design",
  },
  {
    id: "c-iot",
    image: "/certificates/cert-iot.jpg",
    title: "Internet of Things",
  },
  {
    id: "c-bitdegree",
    image: "/certificates/cert-bitdegree.jpg",
    title: "Bitdegree",
    issuer: "Bitdegree",
  },
  {
    id: "c-saylor",
    image: "/certificates/cert-saylor.jpg",
    title: "Saylor Academy",
    issuer: "Saylor Academy",
  },
  {
    id: "c-duke",
    image: "/certificates/cert-duke.jpg",
    title: "Web Design",
    issuer: "Duke University",
  },
  {
    id: "c-robi",
    image: "/certificates/cert-robi.jpg",
    title: "PowerPoint",
    issuer: "Robi",
  },
];
