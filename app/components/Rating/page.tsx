import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const Rating = ({ rating }: { rating: number }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<StarIcon key={i} sx={{ color: "#facc15" }} />);
    } else if (i - rating <= 0.5) {
      stars.push(<StarHalfIcon key={i} sx={{ color: "#facc15" }} />);
    } else {
      stars.push(<StarBorderIcon key={i} sx={{ color: "#9ca3af" }} />);
    }
  }

  return <div className="flex">{stars}</div>;
};

export default Rating;
