"use client";

import { Controller, useForm } from "react-hook-form";
import { createPostSchema, createPostValues } from "@/features/posts/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { createPost, SubmitResult } from "@/features/posts/actions/createPost";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group";
import { Category } from "@/app/generated/prisma/client";
import { useRouter } from "next/navigation";

export default function PostForm({ categories }: { categories: Category[] }) {
    const router = useRouter();
    const [result, setResult] = useState<SubmitResult | null>(null);
    const [isPending, startTransition] = useTransition();

    const { control, handleSubmit, reset } = useForm<createPostValues>(
        {
            resolver: zodResolver(createPostSchema),
            defaultValues: {
                categoryId: "",
                user: "",
                title: "",
                content: "",
            },
            mode: "all",
        },
    );

    const onSubmit = (values: createPostValues) => {
        setResult(null);

        startTransition(async () => {
            const res = await createPost(values);
            setResult(res);
            if (res.ok) {
                reset();
                router.push("/");
            }
        });
    };

    return (
        <Card>
            <form
                onSubmit={handleSubmit(onSubmit)}
                onKeyDown={(e) => {
                    if (
                        e.key === "Enter" &&
                        e.target instanceof HTMLInputElement
                    ) {
                        e.preventDefault();
                    }
                }}
            >
                <CardHeader className="mb-4">
                    <CardTitle>新規投稿</CardTitle>
                </CardHeader>

                <CardContent>
                    <FieldGroup>
                        {/* カテゴリー */}
                        <Controller
                            name="categoryId"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>
                                        カテゴリー
                                        <span className="text-red-500">*</span>
                                    </FieldLabel>
                                    <Select
                                        name={field.name}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger
                                            id={field.name}
                                            aria-invalid={fieldState.invalid}
                                        >
                                            <SelectValue placeholder="選択してください" />
                                        </SelectTrigger>
                                        <SelectContent position="item-aligned">
                                            {categories.map((c) => (
                                                <SelectItem
                                                    key={c.id}
                                                    value={c.id}
                                                >
                                                    {c.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                        {/* 投稿者名 */}
                        <Controller
                            name="user"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>
                                        投稿者名
                                        <span className="text-red-500">*</span>
                                    </FieldLabel>
                                    <Input
                                        id={field.name}
                                        type="text"
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="テスト太郎"
                                        onChange={(event) => {
                                            field.onChange(event.target.value);
                                        }}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                        {/* タイトル */}
                        <Controller
                            name="title"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>
                                        タイトル
                                        <span className="text-red-500">*</span>
                                    </FieldLabel>
                                    <Input
                                        id={field.name}
                                        type="text"
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        onChange={(event) => {
                                            field.onChange(event.target.value);
                                        }}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                        {/* 投稿内容 */}
                        <Controller
                            name="content"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>
                                        投稿内容
                                        <span className="text-red-500">*</span>
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupTextarea
                                            {...field}
                                            id={field.name}
                                            rows={6}
                                            className="min-h-24 resize-none"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        <InputGroupAddon align="block-end">
                                            <InputGroupText className="tabular-nums">
                                                {(field.value ?? "").length}/200
                                                characters
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                        <Button type="submit" className="py-4">
                            {isPending ? "投稿中..." : "投稿する"}
                        </Button>
                    </FieldGroup>

                    {result && (
                        <div
                            className={`mt-6 p-4 rounded-lg border-2 ${
                                result.ok
                                    ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                                    : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                            } transition-all duration-300 animate-in fade-in slide-in-from-top-2`}
                        >
                            <p
                                className={`text-sm font-medium flex items-center gap-2 ${
                                    result.ok
                                        ? "text-green-800 dark:text-green-300"
                                        : "text-red-800 dark:text-red-300"
                                }`}
                            >
                                {result.message}
                            </p>

                            {!result.ok && result.fieldErrors && (
                                <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                                    <pre className="text-xs text-gray-600 dark:text-gray-400 whitespace-pre-wrap overflow-x-auto">
                                        {JSON.stringify(
                                            result.fieldErrors,
                                            null,
                                            2,
                                        )}
                                    </pre>
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>
            </form>
        </Card>
    );
}
