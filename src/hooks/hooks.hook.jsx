import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useErrors = (errors = []) => {
    useEffect(() => {
        errors.forEach(({ isError, error, fallback }) => {
            if(isError){
                if(fallback){
                    fallback();
                }
                toast.error(error?.data?.message || 'Something went wrong');
            }
        });
    }, [errors])
}

const useAsyncMutation = (mutationHook) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);

    const [mutate] = mutationHook();

    const excuteMutation = async (toastMessage, ...args) => {
        setIsLoading(true);
        const toastId = toast.loading(toastMessage || 'Updating data....');

        try{
            const response = await mutate(...args);

            if(response.data){
                toast.success(response?.data?.message || 'Updated data successfully.', {id: toastId });
                setData(response.data);
            }else{
                toast.error(response?.error?.data?.message || 'Something went wrong', { id: toastId });
            }
        }catch(error){
            console.log(error);
            toast.error('Something went wrong.', { id: toastId });
        }finally{
            setIsLoading(false);
        }
    }

    return [ excuteMutation, isLoading, data ];
}

const useSocketEvents = (socket, handlers) => {
    useEffect(() => {

        Object.entries(handlers).forEach(([event, handler]) => {
           socket.on(event, handler); 
        });
        
        return () => {
          Object.entries(handlers).forEach(([event, handler]) => {
            socket.off(event, handler);
          })
        }
    }, [socket, handlers]);
}

export { useErrors, useAsyncMutation, useSocketEvents };