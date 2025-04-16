type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  testimonial: string;
  avatar: string;
  rating: number;
  date: string;
};

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechGrowth Solutions",
    testimonial:
      "This product completely transformed our workflow. We've seen a 40% increase in productivity since implementation. The intuitive interface made adoption across our team seamless.",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    rating: 5,
    date: "2023-04-15",
  },
  {
    id: "2",
    name: "James Wilson",
    role: "CTO",
    company: "Innovate AI",
    testimonial:
      "After evaluating several solutions, this one stood out for its robust feature set and excellent support. The development team was responsive to our feedback and continuously improved the product.",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    rating: 4,
    date: "2023-06-22",
  },
  {
    id: "3",
    name: "Emily Chen",
    role: "Product Manager",
    company: "Nimble Designs",
    testimonial:
      "The integration capabilities are unmatched. We were able to connect with our existing tools in minutes, not days. This has been a game-changer for our cross-functional teams.",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    rating: 5,
    date: "2023-05-10",
  },
  {
    id: "4",
    name: "Michael Rodriguez",
    role: "Small Business Owner",
    company: "Rodriguez Retail",
    testimonial:
      "As a small business, we needed an affordable solution that didn't compromise on quality. This exceeded our expectations and the ROI has been tremendous.",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    rating: 5,
    date: "2023-07-03",
  },
  {
    id: "5",
    name: "Olivia Taylor",
    role: "UX Designer",
    company: "Creative Interfaces",
    testimonial:
      "The attention to design detail impressed me most. It's rare to find a product that balances functionality and aesthetics so well. My team finds it a joy to use daily.",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    rating: 4,
    date: "2023-03-18",
  },
  {
    id: "6",
    name: "David Kim",
    role: "Engineering Lead",
    company: "BuildFast Technologies",
    testimonial:
      "The performance improvements we've seen are measurable and significant. Complex operations that used to take minutes now complete in seconds.",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    rating: 5,
    date: "2023-08-12",
  },
];

export default testimonials;
