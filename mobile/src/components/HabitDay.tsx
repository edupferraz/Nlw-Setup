import clsx from "clsx";
import dayjs from "dayjs";
import { TouchableOpacity, Dimensions, TouchableOpacityProps } from "react-native";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";

const weekDays = 7;
const screenHorizontalPadding = (32 * 2) / 5

export const dayMarginBetween = 8
export const daySize = (Dimensions.get('screen').width/weekDays) - (screenHorizontalPadding + 5)

interface Props extends TouchableOpacityProps {
    amountOfHabits?: number;
    amountCompleted?: number;
    date: Date;
};

export function HabitDay({amountOfHabits = 0, amountCompleted = 0, date, ...rest}: Props) {


    const amountComplishedPercentage = amountOfHabits > 0 ? generateProgressPercentage(amountOfHabits, amountCompleted) : 0
    const today = dayjs().startOf('day').toDate();
    const isCurrentDay = dayjs(date).isSame(today)

    return (
        <TouchableOpacity
            className={clsx('rounded-lg border-2 m-1', {
                ["bg-zinc-900 border-zinc-800"] : amountComplishedPercentage == 0,
                ["bg-violet-900 border-violet-700"] : amountComplishedPercentage > 0 && amountComplishedPercentage < 20,
                ["bg-violet-800 border-violet-600"] : amountComplishedPercentage >= 20 && amountComplishedPercentage < 40,
                ["bg-violet-700 border-violet-500"] : amountComplishedPercentage >= 40 && amountComplishedPercentage < 60,
                ["bg-violet-600 border-violet-500"] : amountComplishedPercentage >= 60 && amountComplishedPercentage < 80,
                ["bg-violet-500 border-violet-400"] : amountComplishedPercentage >= 80,
                ["border-white border-4"] : isCurrentDay,
            })}
            style={{width: daySize, height: daySize}}
            activeOpacity={0.7}
            {...rest}
        />

    )
}