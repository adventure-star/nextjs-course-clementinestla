import PropTypes from "prop-types";

function TableBenefits({ title, benefits }) {
  return (<div>
    <h2 className="text-2xl">{title}</h2>
    <ul>
      {benefits.map((benefit, i) => {
        return (<li key={i}>{benefit}</li>)
      })}
    </ul>
  </div> 
  );
} 

TableBenefits.propTypes = {
  title: PropTypes.string,
  benefits: PropTypes.arrayOf(
    PropTypes.shape({
      benefits: PropTypes.string
    })
  )
};

export default TableBenefits;
