    import { addLink } from "@/app/actions/link";

    export const addLinkInDb = () => {
    return async (link: string) => {
        try {
        const result = await addLink(link);
        return result;
        } catch (error) {
        throw new Error(
            "Error while adding link",
            error instanceof Error ? { cause: error } : undefined
        );
        }
    };
    };
