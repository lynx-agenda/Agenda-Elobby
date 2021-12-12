import { DragDropContext } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import differenceBy from "lodash/differenceBy";
import useUser from "../../hooks/useUser";
import getDiary from "../../services/getDiary";
import Loading from "../Loading/Loading";
import "./Tierlist.css";
import DroppableList from "./DroppableList";
import getTierlists from "../../services/getTierlist";
import patchTierlist from "../../services/patchTierlist";
import fetchElements from "../../lib/fetchElements";

const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const tierlistTypes = ["S", "A", "B", "C", "D"];

const defaultTierlistItems = { diary: [] };

for (const key of tierlistTypes) {
  defaultTierlistItems[key] = [];
}

export default function TierList() {
  const { jwt } = useUser();
  const [all, setAll] = useState(defaultTierlistItems);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!loading) setLoading(true);
        let diary = await getDiary({ jwt });
        const tierlists = await getTierlists({ jwt });
        const tierlistResult = {};

        for (let i = 0; i < tierlists.length; i++) {
          const tierlist = tierlists[i];
          tierlistResult[tierlist.category] = await fetchElements(
            tierlist.elements
          );
        }

        const elements = [
          ...diary.pending,
          ...diary.completed,
          ...diary.watching,
          ...diary.dropped,
        ];
        const diaryResults = await fetchElements(elements);

        const flattenTierlist = Object.keys(tierlistResult)
          .map((category) => tierlistResult[category])
          .flat();

        diary = differenceBy(diaryResults, flattenTierlist, "idApi");
        setLoading(false);
        setAll((prevAll) => ({
          ...prevAll,
          ...tierlistResult,
          diary,
        }));
      } catch (e) {
        // window.location.href = "/NotFound";
        console.error(e);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="marginNav">
      <div className="main-container-tierlist">
        <DragDropContext
          onDragEnd={(result) => {
            const { source, destination } = result;
            if (!destination) {
              return;
            }
            if (source.droppableId === destination.droppableId) {
              setAll((prevAll) => ({
                ...prevAll,
                [source.droppableId]: reorder(
                  prevAll[source.droppableId],
                  source.index,
                  destination.index
                ),
              }));
              return;
            } else {
              // const element = all[source.droppableId][source.index];
              setAll((prevAll) => {
                const elements = {
                  ...prevAll,
                  ...move(
                    prevAll[source.droppableId],
                    prevAll[destination.droppableId],
                    source,
                    destination
                  ),
                };
                patchTierlist({
                  body: {
                    elements: elements[source.droppableId].map(
                      (element) => element._id
                    ),
                  },
                  category: source.droppableId,
                  jwt,
                });
                patchTierlist({
                  body: {
                    elements: elements[destination.droppableId].map(
                      (element) => element._id
                    ),
                  },
                  category: destination.droppableId,
                  jwt,
                });

                return elements;
              });
              /**
               * source es la fuente de donde viene el elemento
               * destination es el destino donde se envia el elemento
               * por tanto queremos guardar el elemento es el destination que
               * en este caso corresponde a "destination.droppableId" que sera 'S' o 'B' por ejemplo
               * asi llamaremos a la api para guardar el elemento que es all[source.droppableId][source.index]
               */
              return;
            }
          }}
        >
          {tierlistTypes.map((type) => (
            <DroppableList
              className="main-container-tierlist"
              type={type}
              elements={all[type]}
            />
          ))}
          <DroppableList type="diary" elements={all.diary} />
        </DragDropContext>
      </div>
    </div>
  );
}
