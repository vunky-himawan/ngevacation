import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/TextArea";
import { Textarea as TextArea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/authContext";
import { toast } from "@/components/ui/use-toast";
import { useGetEventCategory } from "@/hooks/event/useGetEventCategory";
import { EventCategory } from "@/types/Event/EventCategory";
import { usePostEvent } from "@/hooks/event/usePostEvent";
import useValidationEvent from "@/hooks/event/useValidationEvent";
import { EventOperationalDay } from "@/types/Event/EventOperationalDay";
import moment from "moment";
import { useNavigate } from "react-router-dom";

type ErrorEvent = {
  title: string;
  cover: string;
  description: string;
  address: string;
  prize: string;
  operationalDays: string;
  category: string;
};

const EventForm = () => {
  const { user } = useAuth();
  const [slide, setSlide] = useState(0);
  const [cover, setCover] = useState<string>("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [operationalDays, setOperationalDays] = useState<EventOperationalDay[]>(
    []
  );
  const [description, setDescription] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [lowestPrice, setLowestPrice] = useState<number>(0);
  const [highestPrice, setHighestPrice] = useState<number>(0);
  const [categories, setCategories] = useState<EventCategory[]>([]);
  const [categorySelected, setCategorySelected] = useState<{
    category_id: string;
    category_name: string;
  }>({} as { category_id: string; category_name: string });
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<ErrorEvent>({} as ErrorEvent);
  const [isOnPost, setIsOnPost] = useState<boolean>(false);
  const validation = useValidationEvent();
  const getCategories = useGetEventCategory();
  const postEvent = usePostEvent();
  const navigate = useNavigate();

  useEffect(() => {
    getCategories(
      (data: EventCategory[]) => {
        setCategories(data as EventCategory[]);
      },
      () => {
        console.log("Error");
      }
    );
  }, []);

  const handleAddCover = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = evt.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setCover(reader.result as string);
      };
    }
  };

  const handleAddPhotos = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = evt.target.files;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setPhotos((prevPhotos) => [...prevPhotos, reader.result as string]);
        };
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      error.title === "" &&
      error.cover === "" &&
      error.description === "" &&
      error.address === "" &&
      error.prize === "" &&
      error.operationalDays === "" &&
      formRef.current
    ) {
      const formData: FormData = new FormData(formRef.current);

      formData.append("title", title);
      formData.append("price_start", lowestPrice.toString());
      formData.append("price_end", highestPrice.toString());
      formData.append("description", description);
      formData.append("location", address);
      formData.append("rating", "0");
      formData.append("user_id", user?.user_id as string);
      formData.append("category_id", categorySelected.category_id);
      operationalDays.forEach(
        (operationalDay: EventOperationalDay, index: number) => {
          formData.append(
            `operation_days[${index}][date]`,
            operationalDay.date
          );
          formData.append(
            `operation_days[${index}][open_time]`,
            operationalDay.open_time
          );
          formData.append(
            `operation_days[${index}][close_time]`,
            operationalDay.close_time
          );
        }
      );

      setIsOnPost(true);

      postEvent(
        () => {
          toast({
            title: "Success",
            className: "bg-green-500 text-white",
            description:
              "Hidden Gems created successfully, please wait for approval",
            duration: 2000,
          });
          navigate("/events");
        },
        () => {
          setIsOnPost(false);
          toast({
            title: "Error",
            className: "bg-red-500 text-white",
            description: "An unexpected error occurred",
            duration: 2000,
          });
        },
        formData
      );
    }
  };

  const handleNext = () => {
    const validate = {
      title: "",
      cover: "",
      description: "",
      address: "",
      prize: "",
      operationalDays: "",
      category: "",
    };
    switch (slide) {
      case 0:
        validate.cover = validation.validateCover(cover);
        setError((prevError) => ({ ...prevError, cover: validate.cover }));
        if (validate.cover === "") {
          setSlide(1);
        }
        break;
      case 1:
        validate.title = validation.validateTitle(title);
        validate.prize = validation.validatePrize(lowestPrice, highestPrice);
        validate.description = validation.validateDescription(description);
        validate.address = validation.validateAddress(address);
        validate.category = validation.validateCategory(
          categorySelected.category_name
        );

        setError((prevError) => ({
          ...prevError,
          title: validate.title,
          prize: validate.prize,
          description: validate.description,
          address: validate.address,
          category: validate.category,
        }));

        if (
          validate.title === "" &&
          validate.prize === "" &&
          validate.description === "" &&
          validate.address === ""
        ) {
          setSlide(2);
        }
        break;

      case 2:
        validate.operationalDays =
          validation.validateOperationalDays(operationalDays);
        setError((prevError) => ({
          ...prevError,
          operationalDays: validate.operationalDays,
        }));

        break;

      default:
        break;
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        ref={formRef}
        className="pt-32 pb-5 max-md:pt-24 min-w-screen max-w-7xl mx-auto grid gap-5 px-5 w-full"
      >
        <input
          type="file"
          id="cover-photo"
          name="photos"
          hidden
          onChange={handleAddCover}
          required
        />
        <input
          type="file"
          id="event-photos"
          name="photos"
          hidden
          multiple
          onChange={handleAddPhotos}
        />
        {slide === 0 && (
          <ImageForm
            photos={photos}
            cover={cover}
            setPhotos={setPhotos}
            error={error}
          />
        )}
        {slide === 1 && (
          <DetailsForm
            categories={categories}
            categorySelected={categorySelected}
            setCategorySelected={setCategorySelected}
            error={error}
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            address={address}
            setAddress={setAddress}
            lowestPrice={lowestPrice}
            setLowestPrice={setLowestPrice}
            highestPrice={highestPrice}
            setHighestPrice={setHighestPrice}
          />
        )}
        {slide === 2 && (
          <OperationalForm
            setError={setError}
            error={error}
            setOperationalDays={setOperationalDays}
            operationalDays={operationalDays}
          />
        )}
        <div className="flex justify-between">
          <div>
            <Button
              type="button"
              variant={"ghost"}
              className="text-orange-500"
              onClick={() => {
                setSlide(slide - 1);
              }}
              disabled={slide === 0}
            >
              Previous
            </Button>
          </div>
          <div>
            {slide === 2 ? (
              <Button
                className="bg-orange-500 rounded-full hover:bg-orange-400"
                onClick={handleNext}
                disabled={isOnPost}
              >
                {isOnPost && (
                  <span className="icon-[svg-spinners--tadpole] mr-5"></span>
                )}{" "}
                Submit
              </Button>
            ) : (
              <Button
                type="button"
                variant={"ghost"}
                className="text-orange-500"
                onClick={handleNext}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

const ImageForm = ({
  photos,
  cover,
  setPhotos,
  error,
}: {
  photos: string[];
  cover: string;
  setPhotos: React.Dispatch<React.SetStateAction<string[]>>;
  error: ErrorEvent;
}) => {
  const handleDeletePhoto = (index: number) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="flex flex-col gap-10 overflow-hidden">
        <div className="flex flex-col w-full gap-3">
          <h1 className="text-4xl font-semibold">Cover of Event</h1>
          <label
            htmlFor="cover-photo"
            className={`font-cabinet w-full border border-dashed rounded-3xl min-h-[12rem] flex justify-center items-center ${
              error.cover && "border-red-500"
            }`}
          >
            {cover == "" && (
              <div className="flex flex-col items-center justify-center w-full h-full gap-3">
                <div className="flex items-center justify-center w-full gap-3">
                  <div className="icon-[iconamoon--upload-thin] w-5 h-5" />
                  <p className="text-center text-xs">Upload Cover</p>
                </div>
                {error.cover && (
                  <p className="text-red-500 text-xs">{error.cover}</p>
                )}
              </div>
            )}
            {cover !== "" && <img src={cover} alt="" className="rounded-3xl" />}
          </label>
        </div>
        <div className="flex flex-col w-full gap-3">
          <div className="flex w-full justify-between items-center">
            <h1 className="text-4xl font-semibold">Other Photos</h1>
            <Button
              type="button"
              className="bg-orange-500 rounded-full hover:bg-orange-400 text-white w-fit"
            >
              <label htmlFor="event-photos" className="font-cabinet w-fit">
                Upload Photos
              </label>
            </Button>
          </div>
          <div className="overflow-auto">
            <div className="flex gap-5 w-max">
              {photos.length > 0 &&
                photos.map((photo, index) => (
                  <div key={index} className="flex flex-col gap-2 relative">
                    <Button
                      type="button"
                      onClick={() => handleDeletePhoto(index)}
                      className="absolute top-0 right-0 rounded-full bg-red-500 hover:bg-red-400 text-white w-fit h-fit p-2"
                    >
                      <span className="icon-[iconamoon--trash-thin] w-5 h-5"></span>
                    </Button>
                    <div className="p-1.5 bg-black/10 rounded-3xl">
                      <img
                        src={photo}
                        alt=""
                        className="w-full rounded-2xl max-h-[20rem]"
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const DetailsForm = ({
  categorySelected,
  setCategorySelected,
  categories,
  title,
  setTitle,
  description,
  setDescription,
  address,
  setAddress,
  lowestPrice,
  setLowestPrice,
  highestPrice,
  setHighestPrice,
  error,
}: {
  categories: EventCategory[];
  categorySelected: {
    category_id: string;
    category_name: string;
  };
  setCategorySelected: React.Dispatch<
    React.SetStateAction<{
      category_id: string;
      category_name: string;
    }>
  >;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  lowestPrice: number;
  setLowestPrice: React.Dispatch<React.SetStateAction<number>>;
  highestPrice: number;
  setHighestPrice: React.Dispatch<React.SetStateAction<number>>;
  error: ErrorEvent;
}) => {
  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        <div>
          <Label className="text-md">Event Name</Label>
          {error.title && <p className="text-red-500 text-sm">{error.title}</p>}
          <Textarea
            name="title"
            placeholder="Event Name"
            value={title}
            onChange={handleTitleChange}
            style="w-full h-[2.8rem] rounded-md resize-none focus:outline-none overflow-hidden p-2.5 text-gray border"
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <Label className="text-md">Lowest Ticket Price</Label>
            <Input
              type="text"
              inputMode="numeric"
              onChange={(e) => setLowestPrice(Number(e.target.value))}
              value={lowestPrice}
              placeholder="Rp. 0"
            ></Input>
          </div>
          <div>
            <Label className="text-md">Highest Ticket Price</Label>
            <Input
              type="text"
              inputMode="numeric"
              placeholder="Rp. 1.000.000"
              value={highestPrice}
              onChange={(e) => setHighestPrice(Number(e.target.value))}
            ></Input>
          </div>
          {error.prize && (
            <p className="text-red-500 text-sm col-span-2">{error.prize}</p>
          )}
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div>
                <Label className="text-md">Category Event</Label>
                {error.category && (
                  <p className="text-red-500 text-sm">{error.category}</p>
                )}
                <Button className="w-full bg-white shadow-sm border text-black font-normal text-left justify-start hover:bg-tranparent">
                  {categorySelected.category_name || "Select Category"}
                </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-screen max-w-6xl">
              {categories.map((category, index) => (
                <DropdownMenuItem
                  onSelect={() => setCategorySelected(category)}
                  key={index}
                >
                  {category.category_name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <Label className="text-md">Description</Label>
          {error.description && (
            <p className="text-red-500 text-sm">{error.description}</p>
          )}
          <TextArea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <Label className="text-md">Address</Label>
          {error.address && (
            <p className="text-red-500 text-sm">{error.address}</p>
          )}
          <TextArea
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

const OperationalForm = ({
  setError,
  error,
  operationalDays,
  setOperationalDays,
}: {
  setError: React.Dispatch<React.SetStateAction<ErrorEvent>>;
  error: ErrorEvent;
  operationalDays: EventOperationalDay[];
  setOperationalDays: React.Dispatch<
    React.SetStateAction<EventOperationalDay[]>
  >;
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [openingTime, setOpeningTime] = useState<Date>(new Date());
  const [closingTime, setClosingTime] = useState<Date>(new Date());
  const [disabledAddDay, setDisabledAddDay] = useState<boolean>(true);
  const validation = useValidationEvent();

  const handleSelectDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    const date = new Date(target.value);
    console.log(date.toISOString().split("T")[0]);
    setSelectedDate(date);
  };

  const handleAddOpeningTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    const input: string[] = target.value.split(":");
    const time = new Date();
    time.setHours(Number(input[0]));
    time.setMinutes(Number(input[1]));
    time.setSeconds(0);
    setOpeningTime(time);
  };

  const handleAddClosingTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    const input: string[] = target.value.split(":");
    const time = new Date();
    time.setHours(Number(input[0]));
    time.setMinutes(Number(input[1]));
    time.setSeconds(0);
    setClosingTime(time);
  };

  useEffect(() => {
    if (selectedDate && openingTime && closingTime) {
      setDisabledAddDay(false);
    } else {
      setDisabledAddDay(true);
    }
  }, [selectedDate, openingTime, closingTime]);

  const handleAddOperationalDay = () => {
    const operationalDay: EventOperationalDay = {
      date: selectedDate.toISOString(),
      open_time: openingTime.toISOString(),
      close_time: closingTime.toISOString(),
    };

    const validate = validation.validateOperationalDay(operationalDay);
    setError((prevError) => ({ ...prevError, operationalDays: validate }));

    if (selectedDate && openingTime && closingTime && validate === "") {
      setOperationalDays((prev) => [...prev, operationalDay]);
      setSelectedDate(new Date());
      setOpeningTime(new Date());
      setClosingTime(new Date());
      setDisabledAddDay(true);
    }
  };

  return (
    <>
      <div className="overflow-hidden">
        <h1 className="text-4xl font-semibold">Event Dates</h1>
        {error.operationalDays && (
          <p className="text-red-500 text-sm">{error.operationalDays}</p>
        )}

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3 mt-3">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label className="text-md">Date</Label>
                <Input
                  type="date"
                  placeholder="Date"
                  value={moment().format("YYYY-MM-DD")}
                  onChange={handleSelectDate}
                />
              </div>
              <div>
                <Label className="text-md">Start Time</Label>
                <Input
                  type="time"
                  placeholder="Time"
                  value={moment().format("HH:mm")}
                  onChange={handleAddOpeningTime}
                />
              </div>
              <div>
                <Label className="text-md">End Time</Label>
                <Input
                  type="time"
                  placeholder="Time"
                  value={moment().format("HH:mm")}
                  onChange={handleAddClosingTime}
                />
              </div>
            </div>
          </div>

          <Button
            type="button"
            onClick={handleAddOperationalDay}
            className="bg-orange-500 hover:bg-orange-400"
            disabled={disabledAddDay}
          >
            Add Date
          </Button>

          <div className="mt-5 flex flex-col gap-5  w-full">
            <h1 className="text-xl font-semibold mt-5">Preview</h1>
            {operationalDays.length === 0 && <p>No dates added yet</p>}
            <div className="overflow-auto">
              <div className="flex w-max gap-5">
                {operationalDays.map((operationalDay, index) => (
                  <CardResultOperationalDay
                    setOperationalDays={setOperationalDays}
                    index={index}
                    key={index}
                    operationalDay={operationalDay}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const CardResultOperationalDay = ({
  index,
  operationalDay,
  setOperationalDays,
}: {
  index: number;
  operationalDay: EventOperationalDay;
  setOperationalDays: React.Dispatch<
    React.SetStateAction<EventOperationalDay[]>
  >;
}) => {
  const handleDeleteOperationalDay = (idx: number) => {
    setOperationalDays((prevOperationalDays) =>
      prevOperationalDays.filter((_, i) => i !== idx)
    );
  };

  return (
    <>
      <div className="min-w-[20rem] max-h-[20rem] border p-5 rounded-xl flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <div>
            <h1>Date</h1>
            <p className="text-md font-semibold">
              {new Date(operationalDay.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <Button
            onClick={() => handleDeleteOperationalDay(index)}
            type="button"
            variant={"ghost"}
            className="bg-red-500  text-white w-fit h-fit p-2"
          >
            <span className="icon-[iconamoon--trash-thin] w-5 h-5 font-semibold"></span>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <h1>Start Time</h1>
            <p className="text-md font-semibold">
              {new Date(operationalDay.open_time).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
          </div>
          <div>
            <h1>End Time</h1>
            <p className="text-md font-semibold">
              {new Date(operationalDay.close_time).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventForm;
