import PropTypes from "prop-types";
import { Droppable, Draggable } from "react-beautiful-dnd";
import DiaryCard from "../Agenda/DiaryCard";
import "./Tierlist.css";

function DroppableList(props) {
  const { type, elements } = props;

  return (
    <div className="tier-row">
      <div
        className={`label-holder category-color-${type}`}
        // style={
        //   `${type}` === "S"
        //     ? { backgroundColor: "red" }
        //     : { backgroundColor: "blue" }
        // }
      >
        <span className="label">{type}</span>
      </div>
      <Droppable droppableId={type} direction="horizontal">
        {(droppableProvided) => (
          <div
            {...droppableProvided.droppableProps}
            ref={droppableProvided.innerRef}
            className="tierlist-container"
          >
            {elements.map((element, index) => (
              <Draggable
                key={element.id}
                draggableId={JSON.stringify(element.id)}
                index={index}
              >
                {(draggableProvided) => (
                  <div
                    {...draggableProvided.draggableProps}
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.dragHandleProps}
                    className="tierlist-item"
                  >
                    <DiaryCard key={element.id} elemento={element} />
                  </div>
                )}
              </Draggable>
            ))}

            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

DroppableList.propTypes = {
  type: PropTypes.oneOf(["S", "A", "B", "C", "D", "diary"]),
  elements: PropTypes.arrayOf({}),
};

DroppableList.defaultProps = {
  elements: [],
};

export default DroppableList;
