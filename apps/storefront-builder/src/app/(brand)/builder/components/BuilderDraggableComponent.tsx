import { useBuilderContext } from "@/provider/BuilderProvider";
import { useProductContext } from "@/provider/ProductProvider";
import { useStoreContext } from "@/provider/StoreProvider";
import { componentTypeCheck } from "@/utils/componentTypeCheck";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { builderComponentMapping } from "components/src/constant/storefront";
import DeleteComponent from "components/src/icons/iconFiles/deleteComponent.svg?component";
import Edit from "components/src/icons/iconFiles/edit.svg?component";
import Rearrange from "components/src/icons/iconFiles/rearrange.svg?component";
import deleteImage from "components/src/icons/popupImages/storeFrontBuilder/deleteImage.png";
import { StorefrontComponent, StorefrontComponentType } from "components/src/interfaces";
import { showPopup } from "components/src/minor";
import { ModalBox } from "components/src/minor/ModalBox";
import { deleteStorefrontComponent } from "components/src/services/api";
import { useMemo, useState } from "react";

type BuilderDraggableComponentProps = {
  component: StorefrontComponent;
};

export const BuilderDraggableComponent: React.FC<BuilderDraggableComponentProps> = ({ component }) => {
  const { products } = useProductContext();
  const { data, position, type } = component;

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: position, data: { type, data } });
  const { store } = useStoreContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    storefrontComponents,
    setStorefrontComponents,
    setBuilderLoading,
    setIsOpenComponentList,
    newStorefrontComponent,
    setNewStorefrontComponent,
    setIsComponentUpdated,
    setIsOpenImageGridPreview,
  } = useBuilderContext();

  const handleDeleteComponent = async (componentId: string) => {
    if (!store.id) return;
    setBuilderLoading(true);
    try {
      const { error, data } = await deleteStorefrontComponent(componentId);
      if (error) {
        showPopup("error", `${error}`);
      }
      if (data) {
        const deletedComponent = data;
        const updatedComponents = storefrontComponents.filter(component => component.position !== deletedComponent.position);

        setStorefrontComponents(updatedComponents);
        showPopup("success", "Component deleted successfully");
      }
    } catch (error) {
      showPopup("error", `Error deleting component: ${error}`);
    } finally {
      setIsModalOpen(false);
      setBuilderLoading(false);
    }
  };

  const style = {
    transform: CSS.Translate.toString(transform) || undefined,
    transition: transition || undefined,
  };

  const handleEditComponent = () => {
    localStorage.removeItem("globalState");
    setIsOpenComponentList(true);

    let updatedData = data;
    if (type === StorefrontComponentType.PRODUCT_GRID) {
      const selectedProductIds = data.products?.map(product => product?.id).filter((id): id is string => id !== undefined);

      updatedData = {
        ...data,
        _selectedProductsIds: selectedProductIds,
        products,
      };
    }
    setNewStorefrontComponent({
      ...newStorefrontComponent,
      type,
      data: updatedData,
      position,
      dataId: data.id,
      id: component.id,
    });
    setIsOpenImageGridPreview(false);
    setIsComponentUpdated(true);
  };

  const Component = useMemo(() => builderComponentMapping.get(type), [type]);

  if (!Component) return null;
  return (
    <div className="cursor-pointer pt-2" ref={setNodeRef} style={style}>
      <div className="flex justify-between">
        {!componentTypeCheck(type) && (
          <button onClick={handleEditComponent} aria-label="Edit Component">
            <Edit className="text-3xl" />
          </button>
        )}
        <button {...listeners} {...attributes} aria-label="Drag Component">
          <Rearrange className="text-3xl" />
        </button>
        <button onClick={() => setIsModalOpen(true)} aria-label="Delete Component">
          <DeleteComponent className="text-3xl" />
        </button>
      </div>
      <div className="pt-2">
        <Component.component data={data} />
      </div>

      <ModalBox
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        type2
        doubleButton
        doubleButtonLabel="Delete"
        handleDoubleButtonClick={() => handleDeleteComponent(component.id!)}
        image={deleteImage}
        title="Attention!!"
        description="Are you sure you want to delete the component."
      />
    </div>
  );
};
