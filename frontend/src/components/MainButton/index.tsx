import './styles.scss';

type Props = {
  text: string;
};

const MainButton = ({ text }: Props) => {
  return (
    <div className="button-container">
      <button className="bg-primary" type="submit">
        <h6>{text}</h6>
      </button>
    </div>
  );
};

export default MainButton;
