function ARContent() {
  const ref = useRef();
  const [placed, setPlaced] = useState(false);

  useHitTest((hitMatrix) => {
    if (!placed && ref.current) {
      hitMatrix.decompose(
        ref.current.position,
        ref.current.quaternion,
        ref.current.scale
      );
    }
  });

  return (
    <group
      ref={ref}
      onClick={() => setPlaced(true)}
    >
      <CarModel />
    </group>
  );
}

export default ARContent;
